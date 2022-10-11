import { BasePage } from "../../lib/base_page";
import { StudentProfileModel } from "../student_profile_page/model.js";
import { logger, filename } from '../../config/logger.js'
import { StudentProfileLocators } from '../../common/StudentProfileLocators';


export class StudentProfilePage extends StudentProfileLocators {
  constructor(page){
    super();
    this.page = page;
    this.basePage = new BasePage(this.page);
  }

  async verifyStudentProfile () {
    const studentEmail = await this.basePage.verifyElementText(this._filedEmail);
    logger.log('info', `${filename(__filename)}-found student's the email value on page=${studentEmail}`)
    return studentEmail;
  }
}