'use strict'

var JamBase = require('node-jambase')

// use either heroku env variables or apiConfig.js for api key
var key = process.env.JAMBASE_API_KEY ||
          require('../../config/apiConfig').jambase.api_key
var jambase = new JamBase(key)
var mockData = require('../../mock/jambaseMock.json')

// boolean flag for using mock data or using jambase api.
var mock = false

// if mock is true, just send mock data. otherwise, talk to jambase.
if (mock) {
  module.exports.getLocalConcerts = function (req, res, next) {
    console.log(req.query.artist)
    if (req.query.artist === 'Chris Young') {
      res.json(mockData)
    } else {
      res.json({
        message: 'No artists by that name found in JamBase.'
      })
    }
  }
} else {
  // get local concerts using data.zip and data.artistName on req object
  module.exports.getLocalConcerts = function getLocalConcerts (req, res, next) {
    // set date variables to find one year's worth of shows
    var today = new Date().toISOString()
    var nextYear = new Date()
    nextYear.setDate(nextYear.getDate() + 365)
    nextYear = nextYear.toISOString()

    var artistName = req.query.artist

    // first, get artist by name to find artistId
    jambase.getArtistBy_name(artistName, 0, function (err, response) {
      if (err) return next(err)

      if (response.Artists.length > 0) {
        // save artist id that was just looked up
        var artistId = response.Artists[0].Id
        var zip = parseInt(req.query.zip)

        // then use artistId to find local concerts
        jambase.getEventListBy_artistId_zipCode_radius_startDate_endDate(
          artistId, zip, 50, today, nextYear, 0, function (err, response) {
            if (err) return next(err)

            // format the concertList with only the needed data
            var concertList = formatConcerts(artistName, response)
            res.send(concertList)
          })
      } else {
        res.json({
          message: 'No artists by that name found in JamBase.'
        })
      }
    })
  }
}

// removes unneeded data from api and returns clean concert list
function formatConcerts (artistName, rawConcertList) {
  var formattedConcertList = []

  // loop through each event and get only the data needed
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
