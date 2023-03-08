import moment from 'moment'

export const time = (date) => {
  let now =   moment()
  let text;
  let diffInSeconds = now.diff(date, 'seconds')
     text = diffInSeconds + ' seconds ago'
    //minutes
    if ( diffInSeconds >= 60 && diffInSeconds <= 3600) {
        diffInSeconds = now.diff(date, 'minute')
        text = diffInSeconds+ ' minutes ago'
    
    }  else if (diffInSeconds >= 3601  && diffInSeconds <= 86399) {
        //days
       diffInSeconds = now.diff(date, 'hour')
       
       text = diffInSeconds+ ' hours ago'
   
 
   }   else if (diffInSeconds >= 86400 && diffInSeconds <= 604799) {
         //days
        diffInSeconds = now.diff(date, 'day')
        if(diffInSeconds == 1){
            
            text = diffInSeconds+ ' day ago'
        }else{
        text = diffInSeconds+ ' days ago'
        }
  
    } else if (diffInSeconds > 604800) {
        //weeks
        diffInSeconds = now.diff(date, 'week')
        if (diffInSeconds == 1) {
            
            text = diffInSeconds+ ' week ago'
        } else {
            text = diffInSeconds+ ' weeks ago'
            
        }
    
  
    } else if (diffInSeconds > 2592000 ) {
        //months
        diffInSeconds = now.diff(date, 'month')
        if (diffInSeconds == 1) {
        text = diffInSeconds+ ' month ago'
        } else {
            text = diffInSeconds+ ' months ago'
        }
    
    }  else if (diffInSeconds > 31536000 ) {
        //year
        diffInSeconds = now.diff(date, 'years')
        if (diffInSeconds == 1) {
        text = diffInSeconds+ ' year ago'
    } else {
        text = diffInSeconds+ ' years ago'
        }
    
    }
     return text
}
export const  format = (dateTime) => {
    
   return moment(dateTime).format('DD/MM/YYYY')
} 