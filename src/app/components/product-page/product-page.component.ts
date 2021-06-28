import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { delay, take, takeUntil } from "rxjs/operators";
import { DialogComponent } from "src/app/shared/dialog/dialog/dialog.component";
import { Product } from "src/app/shared/interfaces/products";
import { FetchdataService } from "src/app/shared/services/fetchdata.service";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.scss"],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  dataSource: Product[] = [];
  selectedRow: boolean;
  sleepDelay=30_000;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ["id", "name", "features", "plans"];
  displayedColumnsPlans: string[] = [
    "id",
    "paymentInterval",
    "priceCents",
    "currency",
  ];

  constructor(
    private fetchService: FetchdataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchService
      .fetch()
      .pipe(delay(this.sleepDelay))
      .pipe(take(1))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Product) => {
        this.dataSource = data["products"];
      });
  }
  selectItem(row) {
    this.selectedRow = row;
    const dialogConfig = new MatDialogConfig();

    let selectedItem = this.dataSource.filter((data) => data.id == row.id);
    dialogConfig.data = selectedItem;
    this.dialog.open(DialogComponent, dialogConfig);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
