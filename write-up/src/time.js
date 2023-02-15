import moment from 'moment'

export const time = (date) => {
  let now =   moment()
  let text;
  let diffInSeconds = now.diff(date, 'seconds')
     text = diffInSeconds+ ' seconds ago'
    //minutes
    if (diffInSeconds > 60) {
        diffInSeconds = now.diff(date, 'minute')
        text = diffInSeconds+ ' minutes ago'
    
    }   else if (diffInSeconds > 86400) {
         //days
        diffInSeconds = now.diff(date, 'day')
        text = diffInSeconds+ ' days ago'
    
  
    } else if (diffInSeconds > 604800) {
        //weeks
        diffInSeconds = now.diff(date, 'week')
        text = diffInSeconds+ ' weeks ago'
    
  
    } else if (diffInSeconds > 2592000 ) {
        //months
        diffInSeconds = now.diff(date, 'month')
        text = diffInSeconds+ ' month ago'
    
    
    }  else if (diffInSeconds > 31536000 ) {
        //year
        diffInSeconds = now.diff(date, 'years')
        text = diffInSeconds+ ' year ago'
    
    }
     return text
}