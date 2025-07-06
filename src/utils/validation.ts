// Offensive words dictionary (simplified example - should be expanded)
const OFFENSIVE_WORDS: Record<string, string[]> = {
    en: ['idiot', 'stupid', 'retard', 'moron', 'asshole', 'shit', 'fuck', 'bastard', 'bitch', 'cunt'],
    es: ['idiota', 'estúpido', 'imbécil', 'tonto', 'pendejo', 'mierda', 'puta', 'cabrón', 'gilipollas'],
    pt: ['idiota', 'estúpido', 'imbecil', 'burro', 'bosta', 'merda', 'puta', 'caralho', 'pau'],
    fr: ['idiot', 'stupide', 'con', 'merde', 'putain', 'salope', 'connard', 'enculé'],
    de: ['idiot', 'dumm', 'arschloch', 'scheiße', 'hurensohn', 'wichser', 'trottel'],
    it: ['idiota', 'stupido', 'cretino', 'merda', 'cazzo', 'puttana', 'stronzo']
};

/**
 * Validates user password
 * @param password - Password to validate
 * @returns Object with success (boolean) and error message (optional)
 * 
 * Password requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character
 */
export function validatePassword(password: string): { success: boolean; message?: string } {
    if (password.length < 8) {
        return { success: false, message: 'Password must be at least 8 characters long' };
    }

    if (!/[A-Z]/.test(password)) {
        return { success: false, message: 'Password must contain at least one uppercase letter' };
    }

    if (!/[a-z]/.test(password)) {
        return { success: false, message: 'Password must contain at least one lowercase letter' };
    }

    if (!/[0-9]/.test(password)) {
        return { success: false, message: 'Password must contain at least one number' };
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return { success: false, message: 'Password must contain at least one special character' };
    }

    return { success: true };
}

/**
 * Validates user full name
 * @param fullName - Full name to validate
 * @returns Object with success (boolean) and error message (optional)
 * 
 * Name requirements:
 * - Must contain at least 2 parts (first name and last name)
 * - Each part must be at least 2 characters long
 * - Can only contain letters, hyphens, apostrophes and spaces
 */
export function validateFullName(fullName: string): { success: boolean; message?: string } {
    const parts = fullName.trim().split(/\s+/).filter(part => part.length > 0);

    if (parts.length < 2) {
        return { success: false, message: 'Please enter your full name (first and last name)' };
    }

    for (const part of parts) {
        if (part.length < 2) {
            return { success: false, message: 'Each name part must be at least 2 characters long' };
        }

        if (!/^[a-zA-ZÀ-ÿ'-]+$/.test(part)) {
            return { success: false, message: 'Name can only contain letters, hyphens and apostrophes' };
        }
    }

    return { success: true };
}

/**
 * Checks if text contains offensive words in any language
 * @param text - Text to check
 * @returns true if offensive words are found
 */
function containsOffensiveWords(text: string): boolean {
    const lowerText = text.toLowerCase();
    
    for (const language in OFFENSIVE_WORDS) {
        for (const word of OFFENSIVE_WORDS[language]) {
            // Simple contains check (could be enhanced with regex for better matching)
            if (lowerText.includes(word.toLowerCase())) {
                return true;
            }
        }
    }
    
    return false;
}

/**
 * Validates username
 * @param username - Username to validate
 * @returns Object with success (boolean) and error message (optional)
 * 
 * Username requirements:
 * - 3 to 20 characters long
 * - Can only contain letters, numbers, underscores and dots
 * - Cannot start or end with underscore or dot
 * - Cannot contain offensive words in any language
 */
export function validateUsername(username: string): { success: boolean; message?: string } {
    if (username.length < 3) {
        return { success: false, message: 'Username must be at least 3 characters long' };
    }

    if (username.length > 20) {
        return { success: false, message: 'Username must be no more than 20 characters long' };
    }

    if (!/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(username)) {
        return { 
            success: false, 
            message: 'Username can only contain letters, numbers, underscores and dots, and cannot start/end with them' 
        };
    }

    if (containsOffensiveWords(username)) {
        return { success: false, message: 'Username contains inappropriate language' };
    }

    return { success: true };
}


export function validateEmail(email: string): { success: boolean } {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = email.trim().length > 0 && emailRegex.test(email)
    
    return { success:  result};
}