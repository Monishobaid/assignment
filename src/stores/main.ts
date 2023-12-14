import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/main'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const router = useRouter()

  const login = async (details: { email: string; password: string }) => {
    const { email, password } = details

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      handleAuthError(error)
      return
    }

    SET_USER(auth.currentUser)
    router.push('/')
  }

  const register = async (details: { email: string; password: string }) => {
    const { email, password } = details

    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      handleAuthError(error)
      return
    }

    SET_USER(auth.currentUser)
    router.push('/')
  }

  const logout = async () => {
    await signOut(auth)
    CLEAR_USER()
    router.push('/login')
  }

  const fetchUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        CLEAR_USER()
      } else {
        SET_USER(user)

        if (router.currentRoute.value.path === '/login') {
          router.push('/')
        }
      }
    })
  }

  const SET_USER = (user: User | null) => {
    user = user
  }

  const CLEAR_USER = () => {
    user.value = null
  }

  const handleAuthError = (error: any) => {
    switch (error.code) {
      case 'auth/user-not-found':
        alert('User not found')
        break
      case 'auth/wrong-password':
        alert('Wrong password')
        break
      case 'auth/email-already-in-use':
        alert('Email already in use')
        break
      case 'auth/invalid-email':
        alert('Invalid email')
        break
      case 'auth/operation-not-allowed':
        alert('Operation not allowed')
        break
      case 'auth/weak-password':
        alert('Weak password')
        break
      default:
        alert('Something went wrong')
    }
  }

  return {
    user,
    login,
    register,
    logout,
    fetchUser,
  }
})
