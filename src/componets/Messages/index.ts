import { WSnackBar } from 'react-native-smart-tip'
import { colors } from '../../styles/globalStyles'

interface MessagesProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

const Messages = ({ message, type }: MessagesProps) => {
  const snackBarOpts = {
    data: message,
    position: WSnackBar.position.TOP, // 1.TOP 2.CENTER 3.BOTTOM
    duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
    textColor: '#fff',
    backgroundColor: !type || type === 'success' ? colors.success : type === 'error' ? colors.danger : colors.info,
  }

  return WSnackBar.show(snackBarOpts)
}

export default Messages;
