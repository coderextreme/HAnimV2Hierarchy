#!/bin/bash

function exit_on_failure() {
	local status=$1;
	local message=$2;
	local goodstatus=$3;
	local goodmessage=$4;
	if [[ $status -ne 0 && -z "$goodstatus" && $status -ne $goodstatus ]]
	then
		echo "Failure status $status:$message" 1>&2
		exit $status
	elif [[ "$status" = "$goodstatus" ]]
	then
		echo $goodmessage 1>&2
	fi
}


			 node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20200708\].rev2.txt > NewHAnim2.txt
exit_on_failure $?	"node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20200708\].rev2.txt > NewHAnim2.txt"

#			 node readJoeHier.js < NewHAnim2.txt > NewHAnim.json
#exit_on_failure $?	"node readJoeHier.js < NewHAnim2.txt > NewHAnim.json"

			 node joeHierFillInJoints.js < NewHAnim2.txt > NewHAnim2.json
exit_on_failure $?	"node joeHierFillInJoints.js < NewHAnim2.txt > NewHAnim2.json"

			 node JoeJsonToVRML.js < NewHAnim2.json > NewHAnim2.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js < NewHAnim2.json > NewHAnim2.x3dv"

			 perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim2.x3dv > GoodCenters2.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim2.x3dv > GoodCenters2.x3dv"

# Now redo the hierachy
			 node JoeJsonToHier.js < NewHAnim2.json > HAnimV2JointSegmentSiteHierarchy\[20230829\].txt
exit_on_failure $?	"node JoeJsonToHier.js < NewHAnim2.json > HAnimV2JointSegmentSiteHierarchy\[20230829\].txt"

###############################################################################################################################
			 node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20230829\].txt > NewHAnim3.txt
exit_on_failure $?	"node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20230829\].txt > NewHAnim3.txt"

			 node joeHierFillInJoints.js < NewHAnim3.txt > NewHAnim3.json
exit_on_failure $?	"node joeHierFillInJoints.js < NewHAnim3.txt > NewHAnim3.json"

			 node JoeJsonToVRML.js < NewHAnim3.json > NewHAnim3.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js < NewHAnim3.json > NewHAnim3.x3dv"

			 perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim3.x3dv > GoodCenters3.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim3.x3dv > GoodCenters3.x3dv"

			 node JoeJsonToVRML.js < NewHAnim3.json 1> NewLilyApproved.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js  < NewHAnim3.json 1> NewLilyApproved.x3dv"

			 perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved.x3dv > NewLilyApprovedCenters.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved.x3dv > NewLilyApprovedCenters.x3dv"

			 node JoeJsonToJointSegment.js < NewHAnim3.json > JointsSegments.py
exit_on_failure $?	"node JoeJsonToJointSegment.js < NewHAnim3.json > JointsSegments.py"

			 node JoeJsonSeg2SegJoint.js < NewHAnim3.json > Seg2SegJoint.py
exit_on_failure $?	"node JoeJsonSeg2SegJoint.js < NewHAnim3.json > Seg2SegJoint.py"


###############################################################################################################################
			 node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240316\].txt > NewHAnim4.txt
exit_on_failure $?	"node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240316\].txt > NewHAnim4.txt"

			 node joeHierFillInJoints.js < NewHAnim4.txt > NewHAnim4.json
exit_on_failure $?	"node joeHierFillInJoints.js < NewHAnim4.txt > NewHAnim4.json"

			 node JoeJsonToVRML.js < NewHAnim4.json > NewHAnim4.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js < NewHAnim4.json > NewHAnim4.x3dv"

			 perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim4.x3dv > GoodCenters4.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim4.x3dv > GoodCenters4.x3dv"

			 node JoeJsonToVRML.js < NewHAnim4.json 1> NewLilyApproved4.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js  < NewHAnim4.json 1> NewLilyApproved4.x3dv"

			 perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved4.x3dv > NewLilyApprovedCenters4.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved4.x3dv > NewLilyApprovedCenters4.x3dv"

			 node JoeJsonToJointSegment.js < NewHAnim4.json > JointsSegments4.py
exit_on_failure $?	"node JoeJsonToJointSegment.js < NewHAnim4.json > JointsSegments4.py"

			 node JoeJsonSeg2SegJoint.js < NewHAnim4.json > Seg2SegJoint4.py
exit_on_failure $?	"node JoeJsonSeg2SegJoint.js < NewHAnim4.json > Seg2SegJoint4.py"



###############################################################################################################################
			 node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240329\].txt > NewHAnim5.txt
exit_on_failure $?	"node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240329\].txt > NewHAnim5.txt"

			 node joeHierFillInJoints.js < NewHAnim5.txt > NewHAnim5.json
exit_on_failure $?	"node joeHierFillInJoints.js < NewHAnim5.txt > NewHAnim5.json"

			 node JoeJsonToVRML.js < NewHAnim5.json > NewHAnim5.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js < NewHAnim5.json > NewHAnim5.x3dv"

			 perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim5.x3dv > GoodCenters5.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim5.x3dv > GoodCenters5.x3dv"

			 node JoeJsonToVRML.js < NewHAnim5.json 1> NewLilyApproved5.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js  < NewHAnim5.json 1> NewLilyApproved5.x3dv"

			 perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved5.x3dv > NewLilyApprovedCenters5.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved5.x3dv > NewLilyApprovedCenters5.x3dv"

			 node JoeJsonToJointSegment.js < NewHAnim5.json > JointsSegments5.py
exit_on_failure $?	"node JoeJsonToJointSegment.js < NewHAnim5.json > JointsSegments5.py"

			 node JoeJsonSeg2SegJoint.js < NewHAnim5.json > Seg2SegJoint5.py
exit_on_failure $?	"node JoeJsonSeg2SegJoint.js < NewHAnim5.json > Seg2SegJoint5.py"


###############################################################################################################################
			 node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240407\].txt > NewHAnim6.txt
exit_on_failure $?	"node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240407\].txt > NewHAnim6.txt"

			 node joeHierFillInJoints.js < NewHAnim6.txt > NewHAnim6.json
exit_on_failure $?	"node joeHierFillInJoints.js < NewHAnim6.txt > NewHAnim6.json"

			 node JoeJsonToVRML.js < NewHAnim6.json > NewHAnim6.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js < NewHAnim6.json > NewHAnim6.x3dv"

			 perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim6.x3dv > GoodCenters6.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim6.x3dv > GoodCenters6.x3dv"

			 node JoeJsonToVRML.js < NewHAnim6.json 1> NewLilyApproved6.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js  < NewHAnim6.json 1> NewLilyApproved6.x3dv"

			 perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved6.x3dv > NewLilyApprovedCenters6.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved6.x3dv > NewLilyApprovedCenters6.x3dv"

			 node JoeJsonToJointSegment.js < NewHAnim6.json > JointsSegments6.py
exit_on_failure $?	"node JoeJsonToJointSegment.js < NewHAnim6.json > JointsSegments6.py"

			 node JoeJsonSeg2SegJoint.js < NewHAnim6.json > Seg2SegJoint6.py
exit_on_failure $?	"node JoeJsonSeg2SegJoint.js < NewHAnim6.json > Seg2SegJoint6.py"


###############################################################################################################################
			 node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240502\].txt > NewHAnim7.txt
exit_on_failure $?	"node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240502\].txt > NewHAnim7.txt"

			 node joeHierFillInJoints.js < NewHAnim7.txt > NewHAnim7.json
exit_on_failure $?	"node joeHierFillInJoints.js < NewHAnim7.txt > NewHAnim7.json"

			 node JoeJsonToVRML.js < NewHAnim7.json > NewHAnim7.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js < NewHAnim7.json > NewHAnim7.x3dv"

			 perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim7.x3dv > GoodCenters7.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim7.x3dv > GoodCenters7.x3dv"

			 node JoeJsonToVRML.js < NewHAnim7.json 1> NewLilyApproved7.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js  < NewHAnim7.json 1> NewLilyApproved7.x3dv"

			 perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved7.x3dv > NewLilyApprovedCenters7.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved7.x3dv > NewLilyApprovedCenters7.x3dv"

			 node JoeJsonToJointSegment.js < NewHAnim7.json > JointsSegments7.py
exit_on_failure $?	"node JoeJsonToJointSegment.js < NewHAnim7.json > JointsSegments7.py"

			 node JoeJsonSeg2SegJoint.js < NewHAnim7.json > Seg2SegJoint7.py
exit_on_failure $?	"node JoeJsonSeg2SegJoint.js < NewHAnim7.json > Seg2SegJoint7.py"


###############################################################################################################################
			 node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240517\].txt > NewHAnim8.txt
exit_on_failure $?	"node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240517\].txt > NewHAnim8.txt"

			 node joeHierFillInJoints.js < NewHAnim8.txt > NewHAnim8.json
exit_on_failure $?	"node joeHierFillInJoints.js < NewHAnim8.txt > NewHAnim8.json"

			 node JoeJsonToVRML.js < NewHAnim8.json > NewHAnim8.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js < NewHAnim8.json > NewHAnim8.x3dv"

			 perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim8.x3dv > GoodCenters8.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim8.x3dv > GoodCenters8.x3dv"

			 node JoeJsonToVRML.js < NewHAnim8.json 1> NewLilyApproved8.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js  < NewHAnim8.json 1> NewLilyApproved8.x3dv"

			 perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved8.x3dv > NewLilyApprovedCenters8.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved8.x3dv > NewLilyApprovedCenters8.x3dv"

			 node JoeJsonToJointSegment.js < NewHAnim8.json > JointsSegments8.py
exit_on_failure $?	"node JoeJsonToJointSegment.js < NewHAnim8.json > JointsSegments8.py"

			 node JoeJsonSeg2SegJoint.js < NewHAnim8.json > Seg2SegJoint8.py
exit_on_failure $?	"node JoeJsonSeg2SegJoint.js < NewHAnim8.json > Seg2SegJoint8.py"

			 node JoeJsonToJointSegmentSite.js < NewHAnim8.json
exit_on_failure $?	"node JoeJsonToJointSegmentSite.js < NewHAnim8.json"

###############################################################################################################################
			 node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240618\].txt > NewHAnim9.txt
exit_on_failure $?	"node correctJoeHier.js < HAnimV2JointSegmentSiteHierarchy\[20240618\].txt > NewHAnim9.txt"

			 node joeHierFillInJoints.js < NewHAnim9.txt > NewHAnim9.json
exit_on_failure $?	"node joeHierFillInJoints.js < NewHAnim9.txt > NewHAnim9.json"

			 node JoeJsonToVRML.js < NewHAnim9.json > NewHAnim9.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js < NewHAnim9.json > NewHAnim9.x3dv"

			 perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim9.x3dv > GoodCenters9.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl UnboxedTemplate.x3dv NewHAnim9.x3dv > GoodCenters9.x3dv"

			 node JoeJsonToVRML.js < NewHAnim9.json 1> NewLilyApproved9.x3dv
exit_on_failure $?	"node JoeJsonToVRML.js  < NewHAnim9.json 1> NewLilyApproved9.x3dv"

			 perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved9.x3dv > NewLilyApprovedCenters9.x3dv
exit_on_failure $?	"perl haveSkeletonAddCenters.pl Lily73Final0823Test4.x3dv NewLilyApproved9.x3dv > NewLilyApprovedCenters9.x3dv"

			 node JoeJsonToJointSegment.js < NewHAnim9.json > JointsSegments9.py
exit_on_failure $?	"node JoeJsonToJointSegment.js < NewHAnim9.json > JointsSegments9.py"

			 node JoeJsonSeg2SegJoint.js < NewHAnim9.json > Seg2SegJoint9.py
exit_on_failure $?	"node JoeJsonSeg2SegJoint.js < NewHAnim9.json > Seg2SegJoint9.py"

			 node JoeJsonToJointSegmentSite.js < NewHAnim9.json
exit_on_failure $?	"node JoeJsonToJointSegmentSite.js < NewHAnim9.json"

###############################################################################################################################
