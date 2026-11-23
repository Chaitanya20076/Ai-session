import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Seed demo users for rapid testing and role preview during development
const DEMO_USERS = {
  student: {
    uid: 'demo_student_001',
    email: 'student@learnsphere.ai',
    displayName: 'Alex Morgan',
    role: 'student',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  faculty: {
    uid: 'demo_faculty_001',
    email: 'dr.sharma@learnsphere.ai',
    displayName: 'Dr. Evelyn Sharma',
    role: 'faculty',
    status: 'active',
    department: 'Computer Science & AI',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
  },
  admin: {
    uid: 'demo_admin_001',
    email: 'admin@learnsphere.ai',
    displayName: 'System Administrator',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('learnsphere_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('learnsphere_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('learnsphere_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('learnsphere_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('learnsphere_token', token);
    } else {
      localStorage.removeItem('learnsphere_token');
    }
  }, [token]);

  // Login handler
  const login = async (email, password, asRole = null) => {
    setLoading(true);
    try {
      // In Phase 1 foundation: support quick demo accounts and fallback
      if (asRole && DEMO_USERS[asRole]) {
        const demoUser = DEMO_USERS[asRole];
        setUser(demoUser);
        setToken(`mock_token_${demoUser.role}_${Date.now()}`);
        return { success: true, user: demoUser };
      }

      // Default fallback match
      const matched = Object.values(DEMO_USERS).find(u => u.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setUser(matched);
        setToken(`mock_token_${matched.role}_${Date.now()}`);
        return { success: true, user: matched };
      }

      // Default to student if not matched in demo mode
      const genericUser = {
        uid: 'user_' + Date.now(),
        email,
        displayName: email.split('@')[0],
        role: 'student',
        status: 'active'
      };
      setUser(genericUser);
      setToken(`mock_token_student_${Date.now()}`);
      return { success: true, user: genericUser };
    } finally {
      setLoading(false);
    }
  };

  // Quick switch role (Development utility for easy review of student vs faculty vs admin views)
  const switchDemoRole = (role) => {
    if (DEMO_USERS[role]) {
      setUser(DEMO_USERS[role]);
      setToken(`mock_token_${role}_${Date.now()}`);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('learnsphere_user');
    localStorage.removeItem('learnsphere_token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      switchDemoRole,
      isAuthenticated: Boolean(user),
      isStudent: user?.role === 'student',
      isFaculty: user?.role === 'faculty',
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
