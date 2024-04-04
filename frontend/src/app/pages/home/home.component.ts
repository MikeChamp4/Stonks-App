import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrickerWsService }  from '../../services/web-sockets/tricker-ws.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef } from '@angular/core';
import { createClient } from 'redis';

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
    // 'volume24hourto'
  ];

  ELEMENT_DATA : CryptoCurrency[] = [
    { position: 1, fromsymbol: 'BTC', price: 43058.91, open24hour: 42104.33, high24hour: 43407.74, low24hour: 41938.92, volume24hour: 9303.87844941, volume24hourto: 398760129.17096734 },
  ];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(private _liveAnnouncer: LiveAnnouncer, private trickerWs: TrickerWsService, private cd: ChangeDetectorRef ) {}

  ngOnInit(): void {
    // this.trickerWs.getMessages().subscribe((message: { FROMSYMBOL: any; PRICE: any; OPEN24HOUR: any; HIGH24HOUR: any; LOW24HOUR: any; VOLUME24HOUR: any; VOLUME24HOURTO: any; }) => {
    //   console.log('message', message);
    //   // Actualiza la fuente de datos de la tabla con los nuevos datos
    //   this.ELEMENT_DATA = [...this.ELEMENT_DATA, {
    //     position: this.ELEMENT_DATA.length + 1,
    //     fromsymbol: message.FROMSYMBOL,
    //     price: message.PRICE,
    //     open24hour: message.OPEN24HOUR,
    //     high24hour: message.HIGH24HOUR,
    //     low24hour: message.LOW24HOUR,
    //     volume24hour: message.VOLUME24HOUR,
    //     volume24hourto: message.VOLUME24HOURTO
    //   }];
    //   this.dataSource.data = this.ELEMENT_DATA;

    //   // Detecta los cambios y actualiza la vista
    //   this.cd.detectChanges();
    // });
  }

  async ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    const client = createClient()
    .on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    // await client.set('mykey', 'Hello from node redis');
    // const myKeyValue = await client.get('mykey');
    // console.log(myKeyValue);

    // const client = await createClient()
    // .on('error', err => console.log('Redis Client Error', err))
    // .connect();
    // await client.set('miguel', 'BTC'  )
    // const value = await client.get('miguel')

    // console.log('value', value);

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



