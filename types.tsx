import { StyleProp, ViewStyle } from "react-native/types";

interface Department {
    id: number;
    name: string;
    campus: string;
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
        expenseDepartment?: string;
        campus?: string;
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
  onBannerVisibilityChange: (isVisible: boolean) => void;
}

interface Subunit {
  id: number;
  name: string;
  campus: string;
}

interface Attachment {
  id?: string;
  description: string;
  amount: string;
  date: string;
}

//Expense
interface Expense {
  id: string;
  docid?: string;
  address: string;
  attachments: Attachment[];
  bankAccountNumber: string;
  campus: string;
  city: string;
  date: Date;
  department: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  invoiceId: string;
  outstanding: number;
  zip: string;
  prepayment: boolean;
  prepaymentAmount?: string;
  purpose: string;
  totalAmount: number;
  uid: string;
}

interface Expenses {
  Expenses: Expense[];
}

interface ReimbursementListItemProps {
  item: any;
  onPress: () => void;
}

interface BannerProps {
  isAuthenticated: boolean;
  onLoginPress: () => void;
  style?: StyleProp<ViewStyle>;
}

type Candidate = {
  id: string;
  name: string;
};


type Position = {
  id: string;
  name: string;
  candidates: Candidate[];
  status: string;
  isStatuteChange?: boolean;
};

type Vote = {
  id: string;
  candidate: string;
  voterKey: string;
  election: string;
  position: string;
};


interface ElectionProps { 
  id: string;
  electionCode: string;
  name: string;
  description: string;
  date: Date;
  positions: Position[];
  status: string;
  voterKeyRequired: string;
}

interface ActiveVotingSession {
  id?: string;
  positions: Position[];
  status?: string;
  election: string;
  voterKey: string;
}





export { Department, Attachment, UserProfile, SwitchProps, SelectorProps, ProgressBarData, ProgressBarProps, NewsPost, NewsListProps, Subunit, Expense, Expenses, ReimbursementListItemProps, BannerProps, Candidate, Position, ElectionProps, ActiveVotingSession, Vote };