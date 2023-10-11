import { FromEventSignalComponent } from './from-event.signal.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogService } from '../../services/log.service';

describe('FromEventSignalComponent', () => {
  let fixture: ComponentFixture<FromEventSignalComponent>;
  let component: FromEventSignalComponent;
  let logSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FromEventSignalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FromEventSignalComponent);
    component = fixture.componentInstance;

    logSpy = spyOn(TestBed.inject(LogService), 'log');
  });

  describe('onClick', () => {
    it('should call logService.log', () => {
      component.onClick();

      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set new value on the signal', () => {
      expect(component.clicksCount()).toEqual(0);

      component.onClick();

      expect(component.clicksCount()).toEqual(1);
    });
  });
});
