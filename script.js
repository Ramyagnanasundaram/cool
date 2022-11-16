// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/20221114_20221114_1544/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Chill Bro",
                "duration": "2:46",
                "file": "Chill-Bro-MassTamilan.io"
            }, {
                "track": 2,
                "name": "Beast Mode",
                "duration": "8:30",
                "file": "Beast-Mode-MassTamilan.so"
            }, {
                "track": 3,
                "name": "Arjunar-Villu",
                "duration": "5:01",
                "file": "Arjunar-Villu"
            }, {
                "track": 4,
                "name": "Heartiley-Battery",
                "duration": "8:31",
                "file": "Heartiley-Battery-MassTamilan.fm"
            }, {
                "track": 5,
                "name": "Kalakkalu-Mr.-Localu",
                "duration": "5:05",
                "file": "Kalakkalu-Mr.-Localu-MassTamilan.org"
            }, {
                "track": 6,
                "name": "Kan-Irrandil",
                "duration": "2:48",
                "file": "Kan-Irrandil"
            }, {
                "track": 7,
                "name": "Karuthavanlaam-Galeejaam",
                "duration": "5:44",
                "file": "Karuthavanlaam-Galeejaam-MassTamilan.com"
            }, {
                "track": 8,
                "name": "Moongil-Thottam",
                "duration": "5:26",
                "file": "Moongil-Thottam"
            }, {
                "track": 9,
                "name": "Naanga-Vera-Maari",
                "duration": "5:46",
                "file": "Naanga-Vera-Maari-MassTamilan.fm"
            }, {
                "track": 10,
                "name": "Annaatthe-Annaatthe",
                "duration": "5:25",
                "file": "Annaatthe-Annaatthe-MassTamilan.fm"
            
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});