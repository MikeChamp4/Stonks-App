import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrickerWsService } from '../../services/web-sockets/tricker-ws.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'FROMSYMBOL',
    'TOSYMBOL',
    'PRICE',
    'OPEN24HOUR',
    'HIGH24HOUR',
    'LOW24HOUR',
    'VOLUME24HOUR',
    'VOLUME24HOURTO'
  ];

  ELEMENT_DATA: CryptoCurrency = {
    FROMSYMBOL: '',
    TOSYMBOL: '',
    PRICE: 0,
    OPEN24HOUR: 0,
    HIGH24HOUR: 0,
    LOW24HOUR: 0,
    VOLUME24HOUR: 0,
    VOLUME24HOURTO: 0
  };
    //{ position: 1, fromsymbol: 'BTC', price: 43058.91, open24hour: 42104.33, high24hour: 43407.74, low24hour: 41938.92, volume24hour: 9303.87844941, volume24hourto: 398760129.17096734 },

  // dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private trickerWs: TrickerWsService, private cd: ChangeDetectorRef ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.trickerWs.listenForMessages((data: CryptoCurrency) => {

      this.ELEMENT_DATA = data;
      // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.cd.detectChanges();
      console.log(this.ELEMENT_DATA)
    });
  }

  // ngOnInit() {
  //   this.trickerWs.listenForMessages();
  //   //this.trickerWs.sendMessage({ message: 'Hello from Angular!' });
  // }

  // async ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

export interface CryptoCurrency {
  FROMSYMBOL: string | "";
  TOSYMBOL: string | "";
  PRICE: number | 0;
  OPEN24HOUR: number | 0;
  HIGH24HOUR: number | 0;
  LOW24HOUR: number | 0;
  VOLUME24HOUR: number | 0;
  VOLUME24HOURTO: number | 0;
}



