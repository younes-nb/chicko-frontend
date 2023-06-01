import { Pipe, PipeTransform } from '@angular/core';
import { SupportService } from '../support.service';

@Pipe({
  name: 'getUserName',
})
export class GetUserNamePipe implements PipeTransform {
  constructor(private supportService: SupportService) {}

  transform(userId: string): string {
    for (let user of this.supportService.currenRoomUsers) {
      if (user._id === userId && user.name) {
        return user.name;
      }
    }
    return 'ناشناس';
  }
}
