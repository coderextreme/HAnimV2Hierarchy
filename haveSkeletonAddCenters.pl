#!/usr/bin/perl
use strict;
use warnings;

use Math::Trig;

# tAke as input a 2 VRML skeletons.  One with centers, one without, and copys the centers from the first one to the second one, then ouputs

# parameters
#
# $ARGV[0] -- Skeleton with correct centers
# $ARGV[1] -- Target skeleton
#
#

my %joints = ();
my $joint = "WRONG JOINT";

open (SOURCE, "<$ARGV[0]") or die "Couldn't open source skeleton $ARGV[0]";
while(<SOURCE>) {
	my $line = $_;
	$line =~ s/^\s+|\s+$//g;
	if ($line =~ /HAnimJoint.*name[ \t]*[\"\']([^\"\']*)[\'\"](.|\n)*center[ \t]+([-+0-9e\.]*)[ \t]+([-+0-9e\.]*)[ \t]+([-+0-9e\.]*)/) {
		my $joint = $1;
		my $center = "$3 $4 $5";
		$joints{$joint} = {};
		$joints{$joint}->{Center} = $center; # center to fill in
		print STDERR "Found a source HAnimJoint using haveSkeletonAddCenters.pl in $ARGV[0], joint is $joint, center is $center \n";
	} elsif ($line =~ /HAnimJoint.*name[ \t]*[\"\']([^\"\']*)[\'\"]/) {
		my $joint = $1;
		print STDERR "Didn't match HAnimJoint haveSkeletonAddCenters.pl in $ARGV[0] loop, joint is $joint\n";
	}
}
print STDERR "Done matching HAnimJoints with haveSkeletonAddCenters.pl in $ARGV[0]\n";

close(SOURCE);

open (TARGET, "<$ARGV[1]") or die "Couldn't open target skeleton $ARGV[1]";
while(<TARGET>) {
	my $line = $_;
	if ($line =~ /^(.*)HAnimJoint(.*)name[ \t][ \t]*[\"\']([^\"\']*)[\'\"](.*)[ \t][ \t]*center[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)[ \t]+([-+0-9e\.xyz]+)(.*)/) {
		my $header = $1;
		my $leadingfields = $2;
		my $joint = $3;
		my $fields = $4;
		my $center = "$5 $6 $7";
		my $trailer = $8;
		if ($joints{$joint} && $joints{$joint}->{Center} && $joints{$joint}->{Center} ne "x y z") {
			print STDERR "Replacing joint $joint center with '$joints{$joint}->{Center}' for '$center'\n";
			$center = $joints{$joint}->{Center};
		} elsif (%joints // 0) {
			if (defined $joints{$joint} // 0) {
				if (defined $joints{$joint}->{Center} // 0) {
					if ($joints{$joint}->{Center} eq "x y z") {
						#print STDERR "Oops, replacement center $joints{$joint}->{Center} for $joint not used\n";
					} else {
						#print STDERR "Oops, replacement center $joints{$joint}->{Center} for $joint not used\n";
					}
				} else {
					#print STDERR "Oops, replacement center not defined for $joint not used\n";
				}
			} else {
				#print STDERR "Oops, replacement joint $joint can't be found\n";
			}
			print STDERR "Undefined Center in $ARGV[0] for $joint choosing $center\n";
		}
		$line = $header."HAnimJoint".$leadingfields."name \"$joint\" $fields"."center $center $trailer\n";
	} elsif ($line =~ /HAnimJoint/) {
		print STDERR "Match in $line $ARGV[1]:";
		print STDERR "FAILED!\n";
	}
	print $line;
}
close(TARGET);
