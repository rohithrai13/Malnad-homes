
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { auth, storage } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string, photoFile?: File | null) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (oldPw: string, newPw: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Map Firebase User to App User
  const mapUser = (fbUser: FirebaseUser): User => {
    return {
      id: fbUser.uid,
      name: fbUser.displayName || 'User',
      email: fbUser.email || '',
      role: 'user', // Default role
      avatar: fbUser.photoURL || undefined,
      settings: {
        language: 'en',
        theme: 'dark',
        notifications: true
      }
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      // Only set user if email is verified
      if (fbUser && fbUser.emailVerified) {
        setUser(mapUser(fbUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        // Resend verification email if not verified
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        throw new Error("Email not verified");
      }
      
    } catch (error: any) {
      if (error.message === "Email not verified") {
        throw error;
      }
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        throw new Error("Password or Email Incorrect");
      }
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // State update is handled by onAuthStateChanged
    } catch (error: any) {
      console.error("Google Sign In Error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error("Sign in cancelled");
      }
      throw new Error("Failed to sign in with Google");
    }
  };

  const signup = async (name: string, email: string, password: string, photoFile?: File | null) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      let photoURL = "";

      // Upload Profile Photo if provided
      if (photoFile) {
        try {
          const storageRef = ref(storage, `avatars/${userCredential.user.uid}/${photoFile.name}`);
          await uploadBytes(storageRef, photoFile);
          photoURL = await getDownloadURL(storageRef);
        } catch (storageError) {
          console.error("Failed to upload profile photo:", storageError);
          // Fallback to a default avatar generator
          photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff`;
        }
      } else {
         photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff`;
      }

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL
      });

      // Send Verification Email
      await sendEmailVerification(userCredential.user);

      // Sign out immediately so they can't access the app until verified
      await signOut(auth);

    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error("User already exists. Sign in?");
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        throw new Error("No user found with this email address.");
      }
      throw error;
    }
  };

  const updateProfileData = async (data: Partial<User>) => {
    if (!auth.currentUser) return;
    
    await updateProfile(auth.currentUser, {
      displayName: data.name || auth.currentUser.displayName,
      photoURL: data.avatar || auth.currentUser.photoURL
    });
    
    // Update local state
    if (user) {
        setUser({ ...user, ...data });
    }
  };

  const updateUserPassword = async (oldPw: string, newPw: string) => {
     // Firebase requires re-authentication for password changes which is complex for this scope
     console.log("Password update requested - requires re-auth flow implementation");
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      loginWithGoogle,
      signup, 
      logout, 
      resetPassword,
      updateProfile: updateProfileData, 
      updatePassword: updateUserPassword 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
