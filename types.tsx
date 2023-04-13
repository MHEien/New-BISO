interface Department {
    id: number;
    name: string;
    campus: string;
  }

    interface Attachment {
        description: string;
        amount: number;
        date: Date;
    }

    interface UserProfile {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        address?: string;
        city?: string;
        zip?: string;
        bankAccount?: string;
        bankType?: number;
        bic?: string;
        subunits?: string[];
        // Add other fields as needed
      }
      
      interface SwitchProps {
        onClick: (value: boolean) => void;
        mode?: 'horizontal' | 'vertical';
        style?: object;
        isEnabled?: boolean;
        initialValue?: boolean;
        onText?: string;
        offText?: string;
      }

      interface SelectorProps {
        visible: boolean;
        data: Array<{ id: string; color: string; label: string }>;
        onSelect: (item: { id: string; color: string; label: string }) => void;
        onClose: () => void;
        selectedItems?: string[]; // Add the selectedItems prop
        enableSearch?: boolean; // Add the enableSearch prop
      }

export { Department, Attachment, UserProfile, SwitchProps, SelectorProps };