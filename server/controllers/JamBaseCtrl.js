'use strict'

var JamBase = require('node-jambase')
var key = require('../../config/apiConfig').jambase.api_key
var jambase = new JamBase(key)

// get local concerts using data.zip and data.artistName on req object
module.exports.getLocalConcerts = function (req, res, next) {
  // set date variables
  var today = new Date().toISOString()
  var nextYear = new Date()
  nextYear.setDate(nextYear.getDate() + 365)
  nextYear = nextYear.toISOString()

  var artistName = req.query.artist

  jambase.getArtistBy_name(artistName, 0, function (err, response) {
    if (err) return next(err)

    if (response.Artists.length > 0) {
      // save artist id that was just looked up
      var artistId = response.Artists[0].Id
      var zip = parseInt(req.query.zip)

      jambase.getEventListBy_artistId_zipCode_radius_startDate_endDate(
        artistId, zip, 50, today, nextYear, 0, function (err, response) {
          if (err) return next(err)
          // formats concerts from response to only the data needed
          var concertList = formatConcerts(artistName, response)
          res.send(concertList)
        })
    }
  })
}

function formatConcerts (artistName, rawConcertList) {
  var formattedConcertList = []

  // loop through each Event and get only the data needed
  rawConcertList.Events.forEach(function (concert) {
    var formattedConcert = {
      name: artistName,
      venue: concert.Venue.Name,
      venueURL: concert.Venue.Url,
      date: concert.Date
    }

    // add formatted concert data to formattedConcertList
    formattedConcertList.push(formattedConcert)
  })

  return formattedConcertList
}
