class Companies {
  constructor(env) {
    this.companyHeader = env.COMPANY_HEADER || 'X-HOC-Company';
    this.cookie = env.COMPANY_SELECTED_COOKIE || 'hoc_selected_company';
  }
}

export default Companies;
