import { ajax } from 'rxjs/ajax';
import { of, catchError, interval, switchMap } from 'rxjs';

const API_URL = 'http://localhost:3000/messages/unread';

const stream$ = interval(5000).pipe(
    switchMap(() =>
        ajax.getJSON(API_URL).pipe(
            catchError(err => {
                console.error(err);
                return of({ error: true, message: err.message });
            })
        )
    )
)

export default stream$;
