package com.allpurposecpq.backend.cpq.item.repository;

import com.allpurposecpq.backend.cpq.item.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    // GET all active items for a domain
    List<Item> findByDomainIdAndStopDateIsNull(Long domainId);

    // GET single active item by id
    Optional<Item> findByIdAndStopDateIsNull(Long id);
}
