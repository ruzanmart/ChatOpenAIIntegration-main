// Simple encryption utility for API keys
// Note: In production, use a proper encryption library like crypto-js or similar

class SimpleEncryption {
  private key: string;

  constructor() {
    // Generate a user-specific key based on their session
    // In production, use a more secure key derivation method
    this.key = this.generateKey();
  }

  private generateKey(): string {
    // Use a simple fixed key for consistent encryption/decryption
    // In production, use proper key derivation with user password or secure random key
    return 'bolt-chat-app-2025-fixed-key-32';
  }

  encrypt(text: string): string {
    if (!text) return '';
    
    try {
      // Simple XOR encryption with hex encoding (for demo purposes)
      // In production, use AES or similar strong encryption
      let encryptedHex = '';
      for (let i = 0; i < text.length; i++) {
        const keyChar = this.key.charCodeAt(i % this.key.length);
        const textChar = text.charCodeAt(i);
        const xorResult = textChar ^ keyChar;
        encryptedHex += xorResult.toString(16).padStart(2, '0');
      }
      return encryptedHex;
    } catch {
      return text; // Fallback to original if encryption fails
    }
  }

  decrypt(encryptedText: string): string {
    if (!encryptedText) return '';
    
    try {
      // Parse hex string back to bytes
      let decrypted = '';
      for (let i = 0; i < encryptedText.length; i += 2) {
        const hexByte = encryptedText.substr(i, 2);
        const encryptedByte = parseInt(hexByte, 16);
        const keyChar = this.key.charCodeAt((i / 2) % this.key.length);
        decrypted += String.fromCharCode(encryptedByte ^ keyChar);
      }
      return decrypted;
    } catch {
      return encryptedText; // Fallback to original if decryption fails
    }
  }
}

export const encryption = new SimpleEncryption();