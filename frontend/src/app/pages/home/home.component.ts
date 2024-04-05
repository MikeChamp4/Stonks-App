import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrickerWsService }  from '../../services/web-sockets/tricker-ws.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'position',
    'fromsymbol',
    'price',
    'open24hour',
    'high24hour',
    'low24hour',
    'volume24hour',
  ];

  ELEMENT_DATA : CryptoCurrency[] = [
    { position: 1, fromsymbol: 'BTC', price: 43058.91, open24hour: 42104.33, high24hour: 43407.74, low24hour: 41938.92, volume24hour: 9303.87844941, volume24hourto: 398760129.17096734 },
  ];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(private _liveAnnouncer: LiveAnnouncer, private trickerWs: TrickerWsService, private cd: ChangeDetectorRef ) {}

  ngOnInit(): void {

  }

  async ngAfterViewInit() {


  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

export interface CryptoCurrency {
  position: number;
  fromsymbol: string | "";
  price: number | 0;
  open24hour: number | 0;
  high24hour: number | 0;
  low24hour: number | 0;
  volume24hour: number | 0;
  volume24hourto: number | 0;
}



