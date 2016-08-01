// libs
import {Store} from '@ngrx/store';

// app
import {FormComponent} from '../../frameworks/core/index';
import {NameListService} from '../../frameworks/app/index';
import {DatabaseService} from '../../frameworks/core/services/database.service';

@FormComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  public newName: string = '';
 constructor(private store: Store<any>, public nameListService: NameListService, private databaseService: DatabaseService) { 
      let count = 0;
      databaseService.sync('counters', (data:any) => {
        console.log('Synced path updated', data);
      });
      setInterval(() => {
        databaseService.addChild('counters', count++);
      }, 3000);
    }

    /*
     * @param newname  any text as input.
     * @returns return false to prevent default form submit behavior to refresh the page.
     */
    addName(): boolean {
      this.nameListService.add(this.newName);
      this.newName = '';
      return false;
    }
  }
