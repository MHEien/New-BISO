import { ViewStyle } from "react-native/types";

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
        enableFavorites?: boolean; // Add the enableFavorites prop
      }

      interface ProgressBarData {
        label: string;
        value: number;
        maxValue: number;
      }
      
      interface ProgressBarProps {
        header?: string;
        data: ProgressBarData[];
        style?: ViewStyle;
        valueLabel?: string;
      }

interface NewsPost {
  title: string;
  subtitle: string;
  department: string;
  date: string;
  departmentLogo: string;
  image: string;
  isFeatured?: boolean; // Add the isFeatured property
}

interface NewsListProps {
  newsPosts: NewsPost[];
}

interface SUbunit {
  id: number;
  name: string;
  campus: string;
}


export { Department, Attachment, UserProfile, SwitchProps, SelectorProps, ProgressBarData, ProgressBarProps, NewsPost, NewsListProps };