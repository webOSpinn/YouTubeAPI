enyo.kind({
	name: "YouTubeAPI.YouTubeVideoDetails",
	kind: enyo.VFlexBox,
	published: {
		dateUploaded: "",
		description: "",
		durationInSeconds: "",
		numDislikes: "",
		numLikes: "",
		numViews: "",
		title: "",
		videoId: ""
	},
	components:[
		{name: "title", content: ""},
		{kind: "HFlexBox", align:"center", pack:"center", components: [
			{kind: "YouTubeAPI.YouTubeViewer", name: "vidViewer", showSuggestedVideos: false, style: "width: 640px; height: 360px;"}
		]},
		{name: "VideoTimeLine", kind: "YouTubeAPI.TimeLine", maximum: 0, onChange: "timeLineChange"},
		{kind: "RowGroup", style: "overflow:hidden;", components: [
			{kind: "HFlexBox", components: [
				{name: "numViews", kind: "Spinn.IconLabel", iconSrc: "YouTubeAPI/images/eye.png", caption: "", style: "width:50%;"},
				{name: "likeDislike", kind: "HFlexBox", align:"center", pack:"left", style: "width:50%;", components: [
					{name: "numLikes", kind: "Spinn.IconLabel", iconSrc: "YouTubeAPI/images/thumbs-up.png", caption: ""},
					{name: "numDislikes", kind: "Spinn.IconLabel", iconSrc: "YouTubeAPI/images/thumbs-down.png", caption: ""}
				]}
			]},
			{kind: "HFlexBox", components: [
				{name: "duration", kind: "Spinn.IconLabel", iconSrc: "YouTubeAPI/images/clock.png", caption: "", style: "width:50%;", },
				{name: "dateUploaded", kind: "Spinn.IconLabel", iconSrc: "YouTubeAPI/images/calendar.png", caption: "", style: "width:50%;", }
			]}
		]},
		{kind: "RowGroup", name: "descriptionHeader", caption: "Description: ", components: [
			{name: "description", content: ""}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
		this.dateUploadedChanged();
		this.descriptionChanged();
		this.durationInSecondsChanged();
		this.numDislikesChanged();
		this.numLikesChanged();
		this.numViewsChanged();
		this.titleChanged();
		this.videoIdChanged();
	},
	dateUploadedChanged: function() {
		if(Spinn.Utils.exists(this.dateUploaded)
			&& enyo.string.trim(this.dateUploaded) != "") {
			var tempDate = new Date(this.dateUploaded);
			var tempDateString = tempDate.toDateString();
			
			if(tempDate.getHours() > 12) {
				tempDateString = tempDateString + " " + Spinn.Utils.zeroPad((tempDate.getHours() - 12),2) + ":" + Spinn.Utils.zeroPad(tempDate.getMinutes(),2) + ":" + Spinn.Utils.zeroPad(tempDate.getSeconds(),2) + " PM";
			} else {
				tempDateString = tempDateString + " " + Spinn.Utils.zeroPad(tempDate.getHours(),2) + ":" + Spinn.Utils.zeroPad(tempDate.getMinutes(),2) + ":" + Spinn.Utils.zeroPad(tempDate.getSeconds(),2) + " AM";
			}
			
			this.$.dateUploaded.setCaption(tempDateString);
		} else {
			this.$.dateUploaded.setCaption("");
		}
	},
	descriptionChanged: function() {
		this.$.description.setContent(this.description);
	},
	durationInSecondsChanged: function() {
		this.$.VideoTimeLine.setPosition(0);
		
		if(this.durationInSeconds == "" ) {
			this.$.VideoTimeLine.setMaximum(0);
			this.$.duration.setCaption("");
		} else {
			this.$.VideoTimeLine.setMaximum(this.durationInSeconds);
			var time = Spinn.Utils.secondsToTime(this.durationInSeconds);
			this.$.duration.setCaption(Spinn.Utils.zeroPad(time.h,2) + ":" + Spinn.Utils.zeroPad(time.m,2) + ":" + Spinn.Utils.zeroPad(time.s,2));
		}
	},
	numDislikesChanged: function() {
		this.$.numDislikes.setCaption(Spinn.Utils.addCommasToNum(this.numDislikes));
	},
	numLikesChanged: function() {
		this.$.numLikes.setCaption(Spinn.Utils.addCommasToNum(this.numLikes));
	},
	numViewsChanged: function() {
		this.$.numViews.setCaption(Spinn.Utils.addCommasToNum(this.numViews));
	},
	titleChanged: function() {
		this.$.title.setContent(this.title);
	},
	videoIdChanged: function() {
		this.$.vidViewer.setVideoId(this.getVideoId());
	},
	getVideoUrl: function() {
		var videoID = this.getVideoId();
		//If no video is selected just go to main YouTube page
		if(Spinn.Utils.exists(videoID) && (enyo.string.trim(videoID) != "")) {
			var tempUrl = "http://www.youtube.com/watch?v=" + this.getVideoId()
			
			if(this.$.VideoTimeLine.getPosition() > 0) {
				tempUrl = tempUrl + "#t=" + this.$.VideoTimeLine.getPosition() + "s";
			}
			
			return tempUrl; 
		} else {
			return "http://www.youtube.com/";
		}
	},
	clear: function() {
		this.setDateUploaded("");
		this.setDescription("");
		this.setDurationInSeconds("");
		this.setNumDislikes("");
		this.setNumLikes("");
		this.setNumViews("");
		this.setTitle("");
		this.setVideoId("");
	},
	timeLineChange: function (inSender, position) {
		this.$.vidViewer.setStartTimeInSeconds(position);
	}
})