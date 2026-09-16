const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  details?: any;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
  roleId: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuditLog {
  id: number;
  userId: number | null;
  action: string;
  entityType: string;
  entityId: number | null;
  oldValues: Record<string, any> | null;
  newValues: Record<string, any> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  userName?: string;
  userEmail?: string;
}

export interface AuditLogFilters {
  page?: number;
  limit?: number;
  userId?: number;
  action?: string;
  entityType?: string;
  entityId?: number;
  startDate?: string;
  endDate?: string;
}

export interface AuditStats {
  period: string;
  totalLogs: number;
  periodLogs: number;
  byAction: Array<{ action: string; count: number }>;
  byEntityType: Array<{ entityType: string; count: number }>;
  mostActiveUsers: Array<{
    userId: number;
    userName: string;
    userEmail: string;
    count: number;
  }>;
  activityByDay: Array<{ date: string; count: number }>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || 'An error occurred',
          details: data.details
        };
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return { error: 'Network error occurred' };
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  }): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/api/auth/me');
  }

  // User endpoints
  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/api/users/profile');
  }

  async getAllUsers(): Promise<ApiResponse<{ users: User[]; total: number }>> {
    return this.request<{ users: User[]; total: number }>('/api/users');
  }

  async getUserById(id: number): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>(`/api/users/${id}`);
  }

  async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    roleId?: number;
    isActive?: boolean;
  }): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id: number, data: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    roleId?: number;
    isActive?: boolean;
  }): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Member endpoints (mirrors user endpoints but uses /api/members)
  async getAllMembers(): Promise<ApiResponse<{ members: User[]; total: number }>> {
    return this.request<{ members: User[]; total: number }>('/api/members');
  }

  async getMemberById(id: number): Promise<ApiResponse<{ member: User }>> {
    return this.request<{ member: User }>(`/api/members/${id}`);
  }

  async createMember(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    roleId?: number;
    isActive?: boolean;
  }): Promise<ApiResponse<{ member: User }>> {
    return this.request<{ member: User }>('/api/members', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMember(id: number, data: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    roleId?: number;
    isActive?: boolean;
  }): Promise<ApiResponse<{ member: User }>> {
    return this.request<{ member: User }>(`/api/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMember(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/api/members/${id}`, {
      method: 'DELETE',
    });
  }

  // Audit log endpoints
  async getAuditLogs(filters?: AuditLogFilters): Promise<ApiResponse<{
    logs: AuditLog[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const queryString = params.toString();
    return this.request<{
      logs: AuditLog[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/api/audit${queryString ? `?${queryString}` : ''}`);
  }

  async getAuditLogById(id: number): Promise<ApiResponse<{ log: AuditLog }>> {
    return this.request<{ log: AuditLog }>(`/api/audit/${id}`);
  }

  async getAuditLogsByEntity(
    entityType: string,
    entityId: number
  ): Promise<ApiResponse<{ logs: AuditLog[]; total: number }>> {
    return this.request<{ logs: AuditLog[]; total: number }>(
      `/api/audit/entity/${entityType}/${entityId}`
    );
  }

  async getAuditLogsByUser(
    userId: number
  ): Promise<ApiResponse<{ logs: AuditLog[]; total: number }>> {
    return this.request<{ logs: AuditLog[]; total: number }>(
      `/api/audit/user/${userId}`
    );
  }

  async getAuditStats(days?: number): Promise<ApiResponse<AuditStats>> {
    const queryString = days ? `?days=${days}` : '';
    return this.request<AuditStats>(`/api/audit/stats${queryString}`);
  }

  async getAuditActions(): Promise<ApiResponse<{ actions: string[] }>> {
    return this.request<{ actions: string[] }>('/api/audit/actions');
  }

  async getAuditEntityTypes(): Promise<ApiResponse<{ entityTypes: string[] }>> {
    return this.request<{ entityTypes: string[] }>('/api/audit/entity-types');
  }

  // Token management
  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  logout(): void {
    this.removeToken();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
