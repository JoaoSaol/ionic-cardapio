import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account/account.service';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
  })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false; 
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alert: AlertController,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;


        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        console.log(this.f.username.value);
        console.log(this.f.password.value);
        if(this.f.username.value === 'admin' && this.f.password.value === 'admin'){
            this.router.navigate(['/']);
            this.localStorageService.set('logado', true);
        } else{
            this.loading = false;
            this.form.reset();
            this.alert.create({
                header: 'Error',
                message: 'Invalid username or password',
                buttons: ['OK']
            }).then(alert => alert.present());
        }
/*         this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    console.error(error);
                    this.loading = false;
                }
            }); */
    }
}