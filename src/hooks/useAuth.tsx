import { useRouter } from 'next/navigation'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '@/services/api'
import { validatePassword, validateUsername, validateEmail } from '@/utils/validation'
import { ISignUpRequestBody } from '@/types/access'
import { IUser } from '@/types/User'

interface AuthProviderProps {
    readonly children: ReactNode
}

interface User {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

interface AuthContextData {
    user: User
    token: string | null
    signInRequestEmail: (email: string, password: string) => Promise<void>
    signInRequestUsername: (username: string, password: string) => Promise<void>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signUpRequest: (data: any) => Promise<void>
    signOut: () => void
    loading: boolean
    setLoading: (value: boolean) => void
    updateUser: (data: Partial<User>) => void
    getUserByEmail: (email: string) => Promise<IUser>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const STORAGE_KEYS = {
    TOKEN: '@il:token',
    EMAIL: '@il:email',
    USER: '@il:user'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleApiError = (error: any) => {
    if (!error?.response) {
        toast.error('Erro de conexão com o servidor')
        return
    }

    const { status, data } = error.response

    switch (status) {
        case 400:
        case 404:
        toast.error(data?.message || 'Requisição inválida')
        break
        case 500:
        toast.error('Ocorreu um erro inesperado em nossos servidores, contate nosso suporte')
        break
        case 502:
        toast.error('Sistema temporariamente fora do ar, tente novamente mais tarde')
        break
        default:
        toast.error('Ocorreu um erro inesperado em nossa aplicação, contate nosso suporte')
    }

    throw error
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loginMethod, setLoginMethod] = useState<'email' | 'username'>('email')
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    useEffect(() => {
        const initializeAuthState = () => {
            try {
                const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
                const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
                
                if (storedToken) {
                    setToken(storedToken);
                    
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                }
            } catch (error) {
                console.error('Error initializing auth state:', error);
            }
        };

        initializeAuthState()
    }, [])

    useEffect(() => {
        const loadUserData = async () => {
            if (!token) return

            try {
                const { data: userData } = await api.get('customer/me', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUser(userData)

            } catch (error) {
                console.error('Error loading user data:', error)
            }
        }

        loadUserData()
    }, [token, loginMethod])

    const getUserByEmail = React.useCallback(
    async (email: string) => {
        setLoading(true);
        try {
            if (!email) {
                toast.error('Email é obrigatório');
                throw new Error('Email é obrigatório');
            }

            const { data } = await api.get(`/users/email`, {
                params: { email },
                headers: token ? { Authorization: `Bearer ${token}` } : undefined
            });

            const userData: IUser = {
                id: data.id,
                fullName: data.fullName,
                email: data.email,
                supportLevel: data.supportLevel,
                pronouns: data.pronouns,
                bio: data.bio,
                profilePicture: data.profilePicture,
                createdAt: data.createdAt
            };

            setUser(userData);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
            return userData;
        } catch (error) {
            handleApiError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    },
    [token, setLoading]
);

    const signInRequestEmail = React.useCallback(
        async (email: string, pswd: string) => {
            setLoading(true)
            try {
                if (!email) {
                    toast.error('Email é obrigatório')
                    throw new Error('Email é obrigatório')
                }
                const { data } = await api.post('/auth/login', { email, password: pswd })
                localStorage.setItem(STORAGE_KEYS.TOKEN, data.access_token)
                setToken(data.access_token)
                
                const userData = await getUserByEmail(email);
                setUser(userData);
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
                
                setLoginMethod('email')
                toast.success('Login realizado com sucesso!')
                router.push('/')
            } catch (error) {
                handleApiError(error)
            } finally {
                setLoading(false)
            }
        },
        [setLoading, router]
    )

    const signInRequestUsername = React.useCallback(
        async (username: string, pswd: string) => {
            setLoading(true)
            try {
                if (!username) {
                    toast.error('Nome de usuário é obrigatório')
                    throw new Error('Nome de usuário é obrigatório')
                }
                const { data } = await api.post('/auth/login-username', { username, password: pswd })
                localStorage.setItem(STORAGE_KEYS.TOKEN, data.access_token)
                setToken(data.access_token)
                setLoginMethod('username')
                toast.success('Login realizado com sucesso!')
                router.push('/')
            } catch (error) {
                console.error('Error during sign-in:', error)
                handleApiError(error)
            } finally {
                setLoading(false)
            }
        },
        [setLoading, router]
    )

    const signUpRequest = React.useCallback(
        async (body: ISignUpRequestBody) => {
            setLoading(true)
            try {
                if (!body.tosAndPrivacy) {
                    toast.error('Você deve aceitar os Termos de Serviço e Política de Privacidade')
                    throw new Error('Você deve aceitar os Termos de Serviço e Política de Privacidade')
                }

                const emailValidation = validateEmail(body.email)
                if (!emailValidation.success) {
                    toast.error('Email inválido ')
                    throw new Error('Email inválido')
                }

                if (body.password != body.confirmPassword) {
                    toast.error('Senhas não coincidem')
                    throw new Error('Senhas não coincidem')
                }

                const pswdValidation = validatePassword(body.password)
                if (!pswdValidation.success) {
                    toast.error('Senha inválida: ' + pswdValidation.message)
                    throw new Error('Senha Inválida ' + pswdValidation.message)
                }

                const usernameValidation = validateUsername(body.username)
                if (!usernameValidation.success) {
                    toast.error('Nome de usuário inválido: ' + usernameValidation.message)
                    throw new Error('Nome de usuário Inválida ' + usernameValidation.message)
                }

                const formattedData = {
                    fullName: body.name,
                    username: body.username,
                    email: body.email,
                    password: body.password,
                }

                const { data } = await api.post('/users', formattedData)

                setToken(data.access_token)
                localStorage.setItem(STORAGE_KEYS.TOKEN, data.access_token)

                const userData = await getUserByEmail(body.email);
                setUser(userData);
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
                
                console.log("Usuário criado com sucesso!");
                toast.success('Usuário criado com sucesso!');
                router.push('/')
            } catch (error) {
                console.log('Error during sign-up:', error)
                handleApiError(error)
            } finally {
                setLoading(false)
            }
        },
        [setLoading, router]
    )
    const signOut = React.useCallback(() => {
        setToken(null)
        setUser({})
        
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key)
        })
        
    }, [])

    const updateUser = React.useCallback((data: Partial<User>) => {
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
    }, [user])

    const contextValue = React.useMemo(() => ({
        user,
        token,
        signInRequestEmail,
        signInRequestUsername,
        signUpRequest,
        signOut,
        loading,
        setLoading,
        updateUser,
        getUserByEmail,
    }), [
        user,
        token,
        signInRequestEmail,
        signInRequestUsername,
        signUpRequest,
        signOut,
        loading,
        setLoading,
        updateUser,
        getUserByEmail,
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}