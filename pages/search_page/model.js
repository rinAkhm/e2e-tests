// @ts-check

export class SearchPersonModel {
    constructor( email='', fullNameLatin='', fullNameRus='', telegramAlias='' ) {
      this.email = email;
      this.fullNameLatin = fullNameLatin;
      this.fullNameRus = fullNameRus;
      this.telegramAlias = telegramAlias; 
    };

    static getEmail = () => {
        return new SearchPersonModel(this.email='an.romanov@innopolis.university');
    };
  };