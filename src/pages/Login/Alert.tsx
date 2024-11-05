interface AlertProps {
    message: string;
}
  
export function Alert({ message }: AlertProps) {
    return (
      <div>
        <span>{message}</span>
      </div>
    );
  }