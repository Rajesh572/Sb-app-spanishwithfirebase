import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
//import { NgZone } from "@angular/core";
import { NavController } from "ionic-angular";
import { NavParams } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { GroupService } from "sunbird";
import { ProfileService } from "sunbird";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { TelemetryGeneratorService } from "../../../service/telemetry-generator.service";
import { GroupMembersPage } from "./group-members";
import { } from 'jasmine';

describe("GroupMembersPage", () => {
    let comp: GroupMembersPage;
    let fixture: ComponentFixture<GroupMembersPage>;

    beforeEach(() => {
        const ngZoneStub = {
            run: () => ({})
        };
        const navControllerStub = {
            push: () => ({}),
            popTo: () => ({}),
            getByIndex: () => ({}),
            length: () => ({})
        };
        const navParamsStub = {
            get: () => ({})
        };
        const loadingControllerStub = {
            create: () => ({})
        };
        const groupServiceStub = {
            createGroup: () => ({
                then: () => ({
                    then: () => ({
                        catch: () => ({})
                    })
                })
            }),
            addUpdateProfilesToGroup: () => ({})
        };
        const profileServiceStub = {
            getAllUserProfile: () => ({
                then: () => ({
                    catch: () => ({})
                })
            })
        };
        const translateServiceStub = {
            get: () => ({
                subscribe: () => ({})
            })
        };
        const telemetryGeneratorServiceStub = {
            generateImpressionTelemetry: () => ({}),
            generateInteractTelemetry: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ GroupMembersPage ],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [TranslateModule.forRoot()],
            providers: [
              //  { provide: NgZone, useValue: ngZoneStub },
                { provide: NavController, useValue: navControllerStub },
                { provide: NavParams, useValue: navParamsStub },
                { provide: LoadingController, useValue: loadingControllerStub },
                { provide: GroupService, useValue: groupServiceStub },
                { provide: ProfileService, useValue: profileServiceStub },
                { provide: TranslateService, useValue: translateServiceStub },
                { provide: TelemetryGeneratorService, useValue: telemetryGeneratorServiceStub }
            ]
        });
        fixture = TestBed.createComponent(GroupMembersPage);
        comp = fixture.componentInstance;
    });

    it("can load instance", () => {
        expect(comp).toBeTruthy();
    });

    it("userList defaults to: []", () => {
        expect(comp.userList).toEqual([]);
    });

    describe("ionViewDidLoad", () => {
        it("makes expected calls", () => {
            const telemetryGeneratorServiceStub: TelemetryGeneratorService = fixture.debugElement.injector.get(TelemetryGeneratorService);
            spyOn(telemetryGeneratorServiceStub, "generateImpressionTelemetry");
            comp.ionViewDidLoad();
            expect(telemetryGeneratorServiceStub.generateImpressionTelemetry).toHaveBeenCalled();
        });
    });

    describe("ionViewWillEnter", () => {
        it("makes expected calls", () => {
            spyOn(comp, "getAllProfile");
            comp.ionViewWillEnter();
            expect(comp.getAllProfile).toHaveBeenCalled();
        });
    });

    describe("getAllProfile", () => {
        it("makes expected calls", () => {
           // const ngZoneStub: NgZone = fixture.debugElement.injector.get(NgZone);
            const profileServiceStub: ProfileService = fixture.debugElement.injector.get(ProfileService);
            spyOn(profileServiceStub, "getAllUserProfile").and.returnValue(Promise.resolve([]));

          //  spyOn(ngZoneStub, "run");
           // spyOn(profileServiceStub, "getAllUserProfile");
            comp.getAllProfile();
          //
          //  expect(ngZoneStub.run).toHaveBeenCalled();
            expect(profileServiceStub.getAllUserProfile).toHaveBeenCalled();
        });
    });

    describe("selectAll", () => {
        it("makes expected calls", () => {
           // const ngZoneStub: NgZone = fixture.debugElement.injector.get(NgZone);
           // spyOn(ngZoneStub, "run");
            comp.selectAll();
           // expect(ngZoneStub.run).toHaveBeenCalled();
        });
    });

    describe("goTOGuestEdit", () => {
        it("makes expected calls", () => {
            const navControllerStub: NavController = fixture.debugElement.injector.get(NavController);
            spyOn(navControllerStub, "push");
            comp.goTOGuestEdit();
            expect(navControllerStub.push).toHaveBeenCalled();
        });
    });

    describe("createGroup", () => {
        it("makes expected calls", () => {
            const navControllerStub: NavController = fixture.debugElement.injector.get(NavController);
            const groupServiceStub: GroupService = fixture.debugElement.injector.get(GroupService);
            const telemetryGeneratorServiceStub: TelemetryGeneratorService = fixture.debugElement.injector.get(TelemetryGeneratorService);
            comp.getLoader = jasmine.createSpy().and.callFake(function () {
                return { present: function () { }, dismiss: function () { } }
            });
            let response = {
                result: {
                    gid: 'test'
                }
            }
            spyOn(groupServiceStub, "createGroup").and.returnValue(Promise.resolve(response));
           // spyOn(comp, "getLoader");
            spyOn(comp, "getToast");
            spyOn(comp, "translateMessage");
            spyOn(navControllerStub, "popTo");
            spyOn(navControllerStub, "getByIndex");
            spyOn(navControllerStub, "length");
           // spyOn(groupServiceStub, "createGroup");
            spyOn(groupServiceStub, "addUpdateProfilesToGroup");
            spyOn(telemetryGeneratorServiceStub, "generateInteractTelemetry");
            comp.createGroup();
            expect(comp.getLoader).toHaveBeenCalled();
            expect(comp.getToast).toHaveBeenCalled();
            expect(comp.translateMessage).toHaveBeenCalled();
            expect(navControllerStub.popTo).toHaveBeenCalled();
            expect(navControllerStub.getByIndex).toHaveBeenCalled();
            expect(navControllerStub.length).toHaveBeenCalled();
            expect(groupServiceStub.createGroup).toHaveBeenCalled();
            expect(groupServiceStub.addUpdateProfilesToGroup).toHaveBeenCalled();
            expect(telemetryGeneratorServiceStub.generateInteractTelemetry).toHaveBeenCalled();
        });
    });

});
