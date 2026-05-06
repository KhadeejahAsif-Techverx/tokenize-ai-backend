import CustomBaseEntity from '@base-classes/base.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export default class AuditSubscriber implements EntitySubscriberInterface<CustomBaseEntity> {
  constructor(
    @InjectDataSource() readonly dataSource: DataSource,
    private readonly cls: ClsService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return CustomBaseEntity;
  }

  beforeInsert(event: InsertEvent<CustomBaseEntity>) {
    const userId = this.cls.get('userId');
    if (event.entity.createdById === undefined && userId) {
      event.entity.createdById = userId;
    }
  }

  beforeUpdate(event: UpdateEvent<CustomBaseEntity>) {
    const userId = this.cls.get('userId');
    if (event.entity && userId) {
      event.entity.updatedById = userId;
    }
  }
}
