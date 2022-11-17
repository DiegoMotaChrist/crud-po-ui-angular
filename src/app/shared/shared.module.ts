import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoI18nConfig } from '@po-ui/ng-components';
import { PoI18nModule } from '@po-ui/ng-components';


import { generalEn } from '../../assets/i18n/generalEn';
import { generalPt } from '../../assets/i18n/generalPt';

const i18nConfig: PoI18nConfig = {
  default: {
    language: 'pt-BR',
    context: 'general',
    cache: true
  },
  contexts: {
    general: {
      'pt-BR': generalPt,
      'en-US': generalEn
    },
    hcm: {
      url: 'http://10.1.1.1/api/translations/hcm/'
    }
  }
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PoModule,
    PoI18nModule.config(i18nConfig),
    PoTemplatesModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    PoModule,
    PoTemplatesModule
  ]
})
export class SharedModule { }
