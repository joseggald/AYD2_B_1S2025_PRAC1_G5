import { router } from './main'

export const navigationService = {
 goToLogin: () => router.navigate({ to: '/login' }),
 goToHome: () => router.navigate({ to: '/home' }),
 goToUnauthorized: () => router.navigate({ to: '/unauthorized' })
}