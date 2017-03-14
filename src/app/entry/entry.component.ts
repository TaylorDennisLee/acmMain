import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { FlatpickrOptions } from '../flat';

import { Field } from './field.model';
import { EntryService } from './entry.service';
import { AdditionalFieldComponent } from './additionalfield/additionalfield.component';



@Component({
  selector: 'entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  providers: [ EntryService ]
})

export class EntryComponent implements  OnInit{

  flat_options : FlatpickrOptions;
  public entry_form: FormArray;
  fields$: Observable<Field[]>;
  fields: Field[];

  constructor(private entry_service: EntryService) {
    this.entry_form = new FormArray([]);
    this.flat_options = {allowInput: true, enableTime: true};
    }

  ngOnInit() {

    this.getForm();
  }


  getForm() {
      this.fields$ = this.entry_service.getFields();
      this.fields$.subscribe(fields => this.fields = fields,
                              error => console.log("Error: " + error),
                                 () => this.loadForm()
      );
  }

  loadForm() {
      const control = <FormArray> this.entry_form;

      // for( let field of this.fields)
      for (let index in this.fields)
      {
          console.log("Adding " + this.fields[index].field_name);
          switch(this.fields[index].field_type)
          {
              case "numeric": {
                  control.push(this.createNumericFormGroup(index));
                  break;
              }
              default: {
                  control.push(this.createBasicFormGroup(index));
                  break;
              }
          }

      }
  }

  addField() {
      console.log("Adding field!");
      const new_field = this.createNewAddiField();
      const control = <FormArray>this.entry_form;
      this.fields.push(new_field);
      control.push(this.createNewBasicFormGroup(new_field));
  }

  removeField(i: number) {
    console.log("remove caught");
    console.log('Fields length before: ' + String(this.fields.length));

      var newFields = [];
      for (let j in this.fields)
      {
        if (j != String(i-1))
        {
          newFields.push(this.fields[j]);
        }
      }
      this.fields = newFields;
      // for (let j of this.fields)
      // {
      //
      // }
      const control = <FormArray>this.entry_form;
      control.removeAt(i-1);
      console.log('Fields length now: ' + String(this.fields.length));
      console.log('complete');
  }


  createBasicFormGroup(thisindex: string)
  { 
    let thisField = this.fields[thisindex];
    return new FormGroup({
      field_type: new FormControl(thisField.field_type),
      field_name: new FormControl(thisField.field_name),
      field_order: new FormControl(Number(thisindex) + 1),
      field_value: new FormControl('')

    });
  }

  createNumericFormGroup(thisindex: string)
  {
    let thisField = this.fields[thisindex];
    return new FormGroup({
      field_type: new FormControl(thisField.field_type),
      field_name: new FormControl(thisField.field_name),
      field_order: new FormControl(Number(thisindex) + 1),
      field_value: new FormControl(''),
      field_unit: new FormControl(thisField.standard_unit)

    });
  }

  createNewBasicFormGroup(thisfield: Field)
  {
    return new FormGroup({
      field_type: new FormControl(thisfield.field_type),
      field_name: new FormControl(thisfield.field_name),
      field_order: new FormControl(thisfield.field_order),
      field_value: new FormControl('')

    });
  }

  createNewAddiField()
  {
    const new_field = {"field_type": "additional", "field_name": "", "field_order": 0, "field_value": ""};
    return new_field;
  }
}
