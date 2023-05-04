function ExpensesWrapper() {
    const { user } = useAuthentication();
  
    if (!user) {
      return null;
    }
  
    return <Expenses user={user} />;
  }
  
  export default ExpensesWrapper;