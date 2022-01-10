import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './recipes/layout/detail/detail.component';
import { FormComponent } from './recipes/layout/form/form.component';
import { LayoutComponent } from './recipes/layout/layout.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes',
  },
  {
    path: 'recipes',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./recipes/recipes.module').then((m) => m.RecipesModule),
      },
      {
        path: 'form',
        component: FormComponent
      },
      {
        path: 'edit',
        component: FormComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      }
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: '**',
    redirectTo: 'recipes'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
