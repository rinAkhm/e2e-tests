// @ts-check

export class SearchPersonModel {
    constructor( email=null, fullNameLatin=null, fullNameRus=null, telegramAlias=null ) {
      this.email = email;
      this.fullNameLatin = fullNameLatin;
      this.fullNameRus = fullNameRus;
      this.telegramAlias = telegramAlias; 
    };

    getEmail = () => {
        return {email:'an.romanov@innopolis.university'};
    };
  };