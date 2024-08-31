function ErrorComponent(props) {
  const { message } = props;
  return (
    <>
      <div className="self-start text-sm text-red-600">{message}</div>
    </>
  );
}

export default ErrorComponent;
