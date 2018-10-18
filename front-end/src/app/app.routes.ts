import { Routes, RouterModule } from '@angular/router';

//import { AuthGuard } from './components/user/auth-guard.service';

import { HomeComponent } from './components/home/home.component';
import { SendAwaitComponent } from './components/send-await/send-await.component';
import { PushComponent } from './components/push/push.component';

const appRoutes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'send-await', component: SendAwaitComponent },
    { path: 'push', component: PushComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);