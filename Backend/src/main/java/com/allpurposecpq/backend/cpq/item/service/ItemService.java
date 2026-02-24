package com.allpurposecpq.backend.cpq.item.service;

import com.allpurposecpq.backend.cpq.item.model.Item;
import com.allpurposecpq.backend.cpq.item.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // GET all active items for a domain
    public List<Item> getActiveItems(Long domainId) {
        return itemRepository.findByDomainIdAndStopDateIsNull(domainId);
    }

    // GET single active item by id
    public Optional<Item> getActiveItemById(Long id) {
        return itemRepository.findByIdAndStopDateIsNull(id);
    }

    // POST - create new item
    public Item createItem(Item item) {
        item.setId(null); // ensure no id is passed in
        item.setStopDate(null); // ensure active on creation
        item.setStartDate(OffsetDateTime.now());
        return itemRepository.save(item);
    }

    // PUT - update existing active item
    public Optional<Item> updateItem(Long id, Item updatedItem) {
        return itemRepository.findByIdAndStopDateIsNull(id).map(existing -> {
            existing.setType(updatedItem.getType());
            existing.setPageNum(updatedItem.getPageNum());
            existing.setSortOrder(updatedItem.getSortOrder());
            existing.setSortParent(updatedItem.getSortParent());
            existing.setCode(updatedItem.getCode());
            existing.setUserLabel(updatedItem.getUserLabel());
            existing.setDefaultValueCsv(updatedItem.getDefaultValueCsv());
            existing.setParentId(updatedItem.getParentId());
            existing.setDescription(updatedItem.getDescription());
            existing.setDetails(updatedItem.getDetails());
            existing.setHelp(updatedItem.getHelp());
            existing.setWid(updatedItem.getWid());
            existing.setInputVal(updatedItem.getInputVal());
            existing.setFieldSizing(updatedItem.getFieldSizing());
            existing.setFieldConstraint(updatedItem.getFieldConstraint());
            existing.setFieldAttributes(updatedItem.getFieldAttributes());
            existing.setActiveWhen(updatedItem.getActiveWhen());
            existing.setImage(updatedItem.getImage());
            existing.setNoteAdmin(updatedItem.getNoteAdmin());
            existing.setStartDate(updatedItem.getStartDate());
            existing.setCustomCss(updatedItem.getCustomCss());
            return itemRepository.save(existing);
        });
    }

    // PUT - deactivate item (no delete, just set stopDate)
    public Optional<Item> deactivateItem(Long id) {
        return itemRepository.findByIdAndStopDateIsNull(id).map(existing -> {
            existing.setStopDate(OffsetDateTime.now());
            return itemRepository.save(existing);
        });
    }
}
