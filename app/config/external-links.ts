type CrossOrigin = 'anonymous' | 'use-credentials' | ''
type ReferrerPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'

export const externalLinks = {
  fontAwesome: {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
    integrity: 'sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==',
    crossOrigin: 'anonymous' as CrossOrigin,
    referrerPolicy: 'no-referrer' as ReferrerPolicy
  }
} 