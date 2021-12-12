import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CategoryFilter, Filter } from '../../models/filter';
import { Product } from '../../models/product';
import { ProductsDataService } from "../productsData.service";

@Component({
  selector: 'app-product-finder',
  templateUrl: './product-finder.component.html',
  styleUrls: ['./product-finder.component.scss']
})
export class ProductFinderComponent implements OnInit {
  categoryFilters: CategoryFilter[];
  selectedFilters: any = [];
  allProducts: Product[];
  products: Product[];
  listProducts: Product[];
  dupproducts: Product[];
  totalProducts: number = 0;
  mainHeader: String;
  subHeader: String;
  listedProducts: number;
  count: number;

  constructor( private productsDataService: ProductsDataService) { }

  ngOnInit(): void {
    this.productsDataService.getCategoryFilters().subscribe(data => {
      this.categoryFilters = data;
    });

     

    this.productsDataService.getProductsData().subscribe(data => {
      this.allProducts = data;
      this.products = this.allProducts;
      this.totalProducts = this.products.length;
      this.setSubHeader(this.totalProducts);
    });
    this.mainHeader = "PRODUCT FINDER"; 
  }

      productCount(){
        for( var f = 0; f < this.selectedFilters.length; f++){
          this.selectedFilters[f].products = this.count;
     }
      }
      
  selectedFilterHandler(filter: Filter){
    if(filter.checked) {
      this.selectedFilters.push(filter);
      this.updateFilter(filter, true);
        console.log(this.selectedFilters)
          this.filterProducts();      
          this.productCount();
    } else if(!filter.checked){
      this.selectedFilters.splice(this.selectedFilters.indexOf(filter),1);
        this.filterProducts();
        this.productCount();
        
    }
  }

  removeFilter(selectedFilter: Filter, filter: Filter){
    this.updateFilter(selectedFilter, false);
    this.selectedFilters.splice(this.selectedFilters.indexOf(selectedFilter),1);
    this.filterProducts();
    this.productCount();
       }

  resetFilter(filter: Filter){
    this.selectedFilters = [];
     for(var i=0; i<this.categoryFilters.length; i++){
         for(var j=0; j<this.categoryFilters[i].filter.length;j++){
             this.categoryFilters[i].filter[j].checked = false;
           }
       }
    this.filterProducts();
    this.productCount();
  }


   updateFilter(filter: Filter, status: boolean){
   for(var i=0; i<this.categoryFilters.length; i++){
     if(this.categoryFilters[i].name === filter.type){
       for(var j=0; j<this.categoryFilters[i].filter.length;j++){
         if(this.categoryFilters[i].filter[j].name === filter.name){
           this.categoryFilters[i].filter[j].checked = status;
         }
       }
       }
     }
   }

   filterProducts(){
     this.products = this.allProducts;
     if(this.selectedFilters && this.selectedFilters.length){
       this.selectedFilters.forEach(filter=>{  
        this.products = this.products.filter(product=>product.specifications.find(specification=>specification.subType.find(subType=>subType.name === filter.name)));
        
      });
     } else {
       this.products = this.allProducts;
     }
     this.totalProducts = this.products.length;
     this.setSubHeader(this.totalProducts);
     this.count = this.totalProducts
   }

  setSubHeader(totalProducts: number){    
    this.subHeader = totalProducts + " MATCHING PRODUCTS FOUND";
  }

  
}