'use strict'

var User = require('../models').User

module.exports.setLocalConcerts = function (req, res, next) {
  // get list of all concerts near zip code from api
    // NOTE:
    // this is going to require quite a bit of code
    // below is mock data to return one year of data, 750 results,
    // that does match with some of Mason's favorite artists
  var allConcertsFromAPI = require('../../mock/concert-api-mock-results.json')

  // get current user from db
  User.findById(req.params.id)
    .then(function (user) {
      // add matching concerts to user, replacing the whole array
      user.localConcerts = matchUserArtistsWithAPIConcerts(
        allConcertsFromAPI,
        user.topArtists
      )

      // save edited user to db and return it
      user.save(function (err) {
        if (err) res.json(err)
        res.json(user)
      })
    }).catch(function (error) {
      res.json(error)
    })

  // check concerts from API for matches with topArtists from current user
  // returns an array of matching concerts
  function matchUserArtistsWithAPIConcerts (apiConcerts, dbArtists) {
    var concertList = []

    // loop through apiConcerts and check each against all dbArtists
    apiConcerts.forEach(function (concert) {
      // NOTE: artist names are being checked in lowercase
      if (String.prototype.toLowerCase.apply(dbArtists).split(',')
        .indexOf(concert.artist.toLowerCase()) > -1
      ) {
        // if matched, create a new concert with the apiConcert's data
        var newEvent = {
          artist: concert.artist,
          venue: concert.venue,
          venueURL: concert.venueURL,
          date: concert.date
        }

        // add the new concert to the concertList array
        concertList.push(newEvent)
      }
    })

    return concertList
  }
}

// OLD CODE
//
// var JamBase = require('node-jambase')
// var key = require('../../config/apiConfig').jambase.api_key
// var jambase = new JamBase(key)
//
// // set date variables
// var today = new Date().toISOString()
// var nextYear = new Date()
// nextYear.setDate(nextYear.getDate() + 365)
// nextYear = nextYear.toISOString()
//
// // find user by id
// User.findById(req.params.id)
//   .then(function (user) {
//     // array to hold found local concerts
//     var localConcerts = []
//
//     // initial api call to get first page
//     jambase.getEventListBy_zipCode_radius_startDate_endDate(
//       user.zip, 50, today, nextYear, 0, function (err, results) {
//         if (err) {
//           res.json(err)
//         }
//
//       // calculate necessary total pages
//         var pagesToQuery = Math.round(results.Info.TotalResults / 50)
//         console.log(pagesToQuery)
//
//       // add found concerts from first page to localConcerts array
//         localConcerts.concat(checkConcertsForArtists(results, user.topArtists))
//
//       // loop through remaining pages, querying API for each page
//         for (var i = 1; i < pagesToQuery; i++) {
//           (function (i) {
//             // query current page in loop
//             setTimeout(function () {
//               console.log(i)
//               jambase.getEventListBy_zipCode_radius_startDate_endDate(
//               user.zip, 50, today, nextYear, i, function (err, results) {
//                 if (err) {
//                 // handle error
//                 }
//               // add found concerts from current page to localConcerts array
//                 localConcerts.concat(checkConcertsForArtists(results, user.topArtists))
//               })
//             }, 3000 * i)
//           })(i)
//         }
//
//       // PROBLEM: this line will return before the async calls above finish. I think.
//         res.json(localConcerts)
//       })
//   }).catch(function (error) {
//     res.json(error)
//   })
//
// // returns an array of found concerts. takes results from api and user object.
// function checkConcertsForArtists (concerts, dbArtists) {
//   var concertList = []
//
//   // for each concert, search the related artists array
//   concerts.Events.forEach(function (event) {
//     // for each artists array from the event,
//     // see if a name matches the artists array from the db
//     event.Artists.forEach(function (eventArtist) {
//       if (dbArtists.indexOf(eventArtist.Name) > -1) {
//         // if matched, create a new event with the event's data
//         var newEvent = {
//           artist: eventArtist.Name,
//           venue: event.Venue.Name,
//           venueURL: event.Venue.Url,
//           date: event.Date
//         }
//
//         // add the new event to the concertList array
//         concertList.push(newEvent)
//       }
//     })
//   })
//   return concertList
// }
