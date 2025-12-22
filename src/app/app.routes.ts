import { Component, createComponent } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, canActivate: [logedGuard],
        children: [
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
            { path: "forgot", component: ForgotPasswordComponent }
        ]
    },

    {
        path: '', component: BlankLayoutComponent, canActivate: [authGuard],
        children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "products", component: ProductComponent },
            { path: "categories", component: CategoriesComponent },
            { path: "brands", component: BrandsComponent },
            { path: "cart", component: CartComponent },
            { path: "details/:ID", component: DetailsComponent },
            { path: "allorders", component: AllordersComponent },
            { path: "orders/:Id", component: OrdersComponent },
            { path: '**', component: NotfoundComponent }

        ]
    },

    { path: '**', component: NotfoundComponent }
];
