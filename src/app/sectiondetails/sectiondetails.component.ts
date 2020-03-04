import { LoginMeSnackBarComponent } from './../login-me-snack-bar/login-me-snack-bar.component';
import { CreatecustomexercisedialogComponent } from './../createcustomexercisedialog/createcustomexercisedialog.component';
import { ExerciseService } from './../exercise.service';
import { CreateexercisedialogComponent } from './../createexercisedialog/createexercisedialog.component';
import { AuthService } from './../auth.service';
import { Satz } from './../models/satz';
import { Exercise } from './../models/exercise';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanService } from '../plan.service';
import { map, take } from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AppUser } from '../models/app.user';
import { PlanNode } from '../models/planNode';
import { FlatNode } from '../models/flatNode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sectiondetails',
  templateUrl: './sectiondetails.component.html',
  styleUrls: ['./sectiondetails.component.css']
})

export class SectiondetailsComponent implements OnInit {
  woman = false;
  showSpinner = true;
  sectionName;
  sectionId;
  planId;
  userCall: Subscription;
  sPath: string;
  userId: string;
  exercises;
  test: Satz;
  noDataEx = false;
  subscription: Subscription;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  appUser: AppUser;
  aExpandedNodes = [];
  bEdit = false;
  private transFormer = (node: PlanNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      value: node.value,
      addInfo: node.addInfo,
      alter: node.alter,
      info: node.info,
      path: node.path,
      saetze: node.saetze,
      level,
      kg: node.kg,
      rpe: node.rpe,
      rep: node.rep,
      children: node.children
    };
  }
  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<FlatNode>(
      node => node.level, node => node.expandable);
  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
      this.transFormer, node => node.level, node => node.expandable, node => node.children);
  // tslint:disable-next-line: member-ordering
      dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor(
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private planService: PlanService,
    private exerciseService: ExerciseService,
    public dialog: MatDialog) {
      this.userCall = auth.appUser$.subscribe(appUser => {
        this.appUser = appUser;
        this.userId = this.auth.getUserId();
       /*  this.userId = NavbarComponent.UserId(); */
        if (this.appUser && this.userId) {
          this.loadPlans();
        } else {
          this.snackBar.openFromComponent(LoginMeSnackBarComponent, {
            duration: 2000
          });
          this.showSpinner = false;
        }
        this.userCall.unsubscribe();
      });
   }

   loadPlans() {
    this.sectionId = this.route.snapshot.paramMap.get('secid');
    this.planId = this.route.snapshot.paramMap.get('planId');
    if (this.planId === 'womangk') {
      this.woman = true;
    } else {
      this.woman = false;
    }
    this.planService.getSectionName(this.planId, this.sectionId).valueChanges().
    pipe(take(1)).subscribe(sectionName  => {
      this.sectionName = sectionName;
    } );
    if (this.planId && this.sectionId) {
      this.sPath = '/' + this.userId + '/plans/' + this.planId + '/' + this.sectionId;
/*       if (this.appUser && this.appUser.usedPlans && this.appUser.usedPlans[this.planId] &&
        this.appUser.usedPlans[this.planId][this.sectionId]) { */
      if (this.appUser) {
        // user hat bereits diesen plan
        this.getUserExercises(true);
      } else {
        this.snackBar.openFromComponent(LoginMeSnackBarComponent , {
          duration: 2000
        });
        // this.getExercises(true);
      }
  }
   }

   getUserExercises(bUnSubscribe) {
    this.subscription = this.planService.getUserExcersice(this.sPath).snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Exercise }))
      )
    ).subscribe( exercises => {
      const dataObject = exercises;
      if (exercises.length === 0) { this.noDataEx = false; } else {this.noDataEx = true; }
      const data = this.buildFileTree(dataObject, 0, this.userId);
      this.dataSource.data = data;
      if (bUnSubscribe) {
        this.subscription.unsubscribe();
      }
      this.showSpinner = false;
      if (this.aExpandedNodes.length > 0) {
        // reset expanded nodes after expanded
        this.aExpandedNodes.forEach(oNode => {
          this.treeControl.expand(this.treeControl.dataNodes[oNode.path]);
        });
        this.aExpandedNodes = [];
      }
    });
   }

/*    getExercises(bUnSubscribe) {
          // user hat den plan noch nicht. Muster wird geladen und dann plan für User erstellt
          this.subscription = this.planService.getExcersice(this.planId, this.sectionId).snapshotChanges()
          .pipe(
            map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Exercise }))
            )
          ).subscribe( exercises => {
            this.planService.createUserEx(this.sPath, exercises);
            // const oUsPlData = {};
            // oUsPlData[this.sectionId] = true;
            // this.planService.updateUserPlanData(this.userId, this.planId, oUsPlData);
            const dataObject = exercises;
            const data = this.buildFileTree(dataObject, 0, this.userId);
            this.dataSource.data = data;
            if (bUnSubscribe) {
              this.subscription.unsubscribe();
            }
            this.showSpinner = false;
          });
   } */

   hasChild = (_: number, node: FlatNode) => node.expandable;

   buildFileTree(obj: object, level: number, userId: string): PlanNode[] {
    return Object.keys(obj).reduce<PlanNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new PlanNode();
      const nodeChild = new PlanNode();
      let sPath;
      let iKey;
      const testNaN = Number(value.key);
      const bisNan = isNaN(testNaN);
      // const iKey = +key;
      // musterplane haben falsche ID
      if (bisNan) {
        iKey = value.key;
      } else {
        iKey = key;
      }
      // iKey = value.key;
      const saetze = [];
      node.children = [];
      // add path of Exercise to be ale to add and remove Sätze
      nodeChild.path = '/users/' + userId + '/plans/' + this.planId + '/' + this.sectionId + '/' + 'exercises/' + iKey + '/';
      if (value != null) {
        if (typeof value === 'object') {
          node.name =  value.name;
          node.addInfo = value.addInfo;
          node.alter = value.alter;
          node.info = value.info;
          node.path = iKey;
          if (value.satz1) {
              value.satz1.name = 'Satz 1';
              sPath = '/users/' + userId + '/plans/' + this.planId + '/' + this.sectionId + '/' + 'exercises/' + iKey + '/satz1/';
              value.satz1.path = sPath;
              saetze.push(value.satz1);
            }
          if (value.satz2) {
              value.satz2.name = 'Satz 2';
              sPath = '/users/' + userId + '/plans/' + this.planId + '/' + this.sectionId + '/' + 'exercises/' + iKey + '/satz2/';
              value.satz2.path = sPath;
              saetze.push(value.satz2);
            }
          if (value.satz3) {
              value.satz3.name = 'Satz 3';
              sPath = '/users/' + userId + '/plans/' + this.planId + '/' + this.sectionId + '/' + 'exercises/' + iKey + '/satz3/';
              value.satz3.path = sPath;
              saetze.push(value.satz3);
            }
          if (value.satz4) {
              sPath = '/users/' + userId + '/plans/' + this.planId + '/' + this.sectionId + '/' + 'exercises/' + iKey + '/satz4/';
              value.satz4.name = 'Satz 4';
              value.satz4.path = sPath;
              saetze.push(value.satz4);
            }
          if (value.satz5) {
              sPath = '/users/' + userId + '/plans/' + this.planId + '/' + this.sectionId + '/' + 'exercises/' + iKey + '/satz5/';
              value.satz5.name = 'Satz 5';
              value.satz5.path = sPath;
              saetze.push(value.satz5);
            }
          if (value.saetze) {
            if (typeof value.saetze === 'object') {
              const resultArray = [];
              Object.keys(value.saetze).map((satzIndex) => {
                const person = value.saetze[satzIndex];
                resultArray[satzIndex] = person;
            });
              value.saetze = resultArray;
            }
            let iSatz;
            value.saetze.forEach(function(oSatz, index) {
              sPath = '/users/' + userId + '/plans/' + this.planId + '/' + this.sectionId + '/' + 'exercises/'
               + iKey + '/saetze/' + index + '/';
              iSatz = saetze.length + 1;
              oSatz.name = 'Satz ' + iSatz + '';
              oSatz.path = sPath;
              saetze.push(oSatz);
            }.bind(this));
            }
          nodeChild.saetze = saetze;
          node.children.push(nodeChild);
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  expandAll() {
    this.treeControl.expandAll();
  }

  collapseAll() {
    this.treeControl.collapseAll();
  }

  openCreateExerciseDialog() {
    const dialogRef = this.dialog.open(CreateexercisedialogComponent, {
      width: '250px',
      data: {planId: this.planId, sectionId: this.sectionId, userId: this.userId}
    });
    dialogRef.afterClosed().subscribe(result => {
      // hole neue Daten nach schließen des Dialogs
      this.addExpandedNodes(this.treeControl);
      this.getUserExercises(true);
    });
  }

  openCreateExerciseDialogCustom() {
    const dialogRef = this.dialog.open(CreatecustomexercisedialogComponent, {
      width: '250px',
      data: {planId: this.planId, sectionId: this.sectionId, userId: this.userId}
    });
    dialogRef.afterClosed().subscribe(result => {
      // hole neue Daten nach schließen des Dialogs
      this.addExpandedNodes(this.treeControl);
      this.getUserExercises(true);
    });
  }

  onEdit() {
    this.bEdit = !this.bEdit;
  }

  onDeleteExercise(oExercise) {
    const sPath = '/users/' + this.userId + '/plans/' + this.planId + '/' + this.sectionId  + '/exercises/' + oExercise.path;
    this.exerciseService.deleteExercise(sPath).then(() => this.getUserExercises(true));
  }

  onCheckExercise(oExercise, bChecked) {
    const aSaetze = oExercise.children[0].saetze;
    aSaetze.forEach(oSatz => {
      let oChangedSatz;
      oChangedSatz = {
          checked: bChecked
        };
      this.planService.update(oSatz.path, oChangedSatz);
    });
    this.addExpandedNodes(this.treeControl);
    this.getUserExercises(true);
    // const sPath = '/users/' + this.userId + '/plans/' + this.planId + '/' + this.sectionId  + '/exercises/' + oExercise.path;
  }

  onChange(oEvent, oNode) {
   const satz = {
      kg : oNode.kg,
      rpe: oNode.rpe,
      rep: oNode.rep
    };
   if (this.userId) {
      const sPath = oNode.path;
      this.planService.update(sPath, satz);
    }
  }

  onSatzChecked(oEvent, oSatz) {
    const satz = {
     checked : oEvent.checked
    };
    if (this.userId) {
      const sPath = oSatz.path;
      this.planService.update(sPath, satz);
    }
  }

  onAddSatz(oNode, oTree) {
    const sExPath = oNode.path + 'saetze/';
    const iLength = oNode.saetze.length;
    const iNewIndex = iLength + 1;
    const oSatz = {
      kg : 0,
      rep: 0,
      rpe: 8
    };
    this.exerciseService.addSatz(sExPath, oSatz, iNewIndex).then(() => {
      this.addExpandedNodes(this.treeControl);
      this.getUserExercises(true);
    });
    }

    onDeleteSatz(oSatz) {
      const sPath = oSatz.path;
      this.addExpandedNodes(this.treeControl);
      this.exerciseService.deleteSatz(sPath).then(() => {
        this.getUserExercises(true);
      });
    }

    addExpandedNodes(oTree) {
      const oDataNodes = oTree.dataNodes;
      oDataNodes.forEach( (oNode, key) => {
        if (oTree.isExpanded(oNode)) {
          oNode.path = key;
          this.aExpandedNodes.push(oNode);
        }
      });
    }
}
