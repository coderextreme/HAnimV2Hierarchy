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
