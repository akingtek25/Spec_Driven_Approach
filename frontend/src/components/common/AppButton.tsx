import { Button, type ButtonProps } from '@fluentui/react-components';

export type AppButtonProps = ButtonProps & { label: string };

const AppButton = ({ label, ...rest }: AppButtonProps) => <Button {...rest}>{label}</Button>;

export default AppButton;
