const Notification = ({ message, className }) => {
  return message === null ? null : <div className={className}>{message}</div>;
};

export default Notification;
